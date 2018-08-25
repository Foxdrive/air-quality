import React from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'rc-slider/assets/index.css';



import last from 'lodash/last'
import find from 'lodash/find'
import filter from 'lodash/filter';
import Slider from 'rc-slider';
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

import styleJSON from '../../style.json';
import AppContext from '../../context.js';
import Panel from '../../Components/Panel';
import Comet from '../../assets/images/cometa-icon.svg';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 6.244750,
        longitude: -75.574830,
        zoom: 12
      },
      popupId: null // true to show, false to hide
    };

    this.handleOnViewportChange = this.handleOnViewportChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
    this._getDeviceByName = this._getDeviceByName.bind(this);
    this._resize = this._resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  handleRangeChange(range) {
    this.props.filterDevices(range);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _getDeviceByName(deviceId) {
    return find(this.props.data, (device) => device.name === deviceId);
  }

  renderPopup() {
    if (this.state.popupId) {
      const device = this._getDeviceByName(this.state.popupId)
      return (
        <Popup
          anchor="bottom"
          offsetTop= {40}
          longitude={device.lng}
          latitude={device.lat}
          onClose={this.onClosePopup} >
          <div>
            <VictoryChart 
              scale={{ x: "time" }}
              containerComponent={<VictoryVoronoiContainer/>}
            >
              <VictoryLine
                data={device.measurement.map(dataset => ({x: dataset[0], y: dataset[1], label: dataset[1]}))}
                labels={(data) => `x: ${data.x}`}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryChart>
          </div>
        </Popup>
      )
    }
    else {
      return null;
    }
    
  }

  onMarkerClick(e) {
    this.setState({popupId: e.target.dataset.id});
  }

  onClosePopup() {
    this.setState({popupId: null});
  }

  _resize() {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  handleOnViewportChange(viewport) {
    this.setState({viewport});
  }

  render(){
    const { apiKey } = this.props;  
    
    return (
      <AppContext.Consumer>
      {(state) =>
        <div>
          <Panel>
            <div style={{width: '100%'}}>
              <Range min={0} max={40000} step={1000} onChange={this.handleRangeChange} tipFormatter={value => `${value}`}></Range>
            </div>
            <div>
              
            </div>
          </Panel>
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={apiKey}
            mapStyle={styleJSON}
            onViewportChange={this.handleOnViewportChange}
            doubleClickZoom={false}>
              {
                Array.isArray(state.data) && filter(state.data, (device) => last(device.measurement)[1] >= state.filter[0] && last(device.measurement)[1] <= state.filter[1]).map((device) =>
                  <Marker key={device.lat + device.lng} latitude={device.lat} longitude={device.lng}>
                    <img onClick={this.onMarkerClick} data-id={device.name} src={Comet} width="30px" alt={device.name} title={device.name}/>
                  </Marker>
                )
              }
              {this.renderPopup()}
          </ReactMapGL>
        </div>
      }     
      </AppContext.Consumer>
    );
  }
}

MapContainer.propTypes = {
  apiKey: PropTypes.string
};

export default MapContainer;