import React from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'rc-slider/assets/index.css';


import { VictoryChart, VictoryLabel, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryArea } from 'victory';
import last from 'lodash/last'
import find from 'lodash/find'
import filter from 'lodash/filter';
import Slider from 'rc-slider';
import styleJSON from '../../style.json';
import Panel from '../../Components/Panel';
import MarkerIcon from '../../Components/MarkerIcon'
import styles from './home.styles.css';

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
      popupId: null
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
    this.props.filterDevices([0, 40000]);
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
          anchor="top"
          offsetTop= {40}
          longitude={device.lng}
          latitude={device.lat}
          closeOnClick
          onClose={this.onClosePopup} >
          <div>
            <VictoryChart 
              scale={{ x: "time" }}
              height={200} 
              width={300}
              style={{
                data: {
                  color: "#979ba9"
                },
                labels: {fontSize: 12},
                parent: {background: "#2a2933"}
              }}
              containerComponent={<VictoryVoronoiContainer responsive={false}/>}
            >
              <VictoryLabel 
                text={device.name}
                x={20} 
                y={20} 
                textAnchor="start"
                style= {{
                  fill: "#979ba9"
                }}
              />
              <VictoryAxis 
                dependentAxis
                style={{
                  axis: {stroke: "#979ba9"},
                  tickLabels: {
                    fill: "#979ba9"
                  }
                }}
              >
              </VictoryAxis>
              <VictoryAxis 
                style={{
                  axis: {stroke: "#979ba9"},
                  tickLabels: {
                    fill: "#979ba9"
                  }
                }}
              />
              <VictoryArea
                data={device.measurement.map(dataset => ({x: dataset[0], y: dataset[1], label: dataset[1]}))}
                style={{
                  data: {
                    stroke: "#94f267",
                    fill: "rgba(148, 242, 103, 0.3)",
                    strokeWidth: 2
                  }
                }}
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
    this.setState({popupId: e.currentTarget.dataset.id});
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
    const { apiKey, data, filterRange } = this.props;  
    
    return (
      <div>
        <Panel>
          <div style={{width: '100%'}}>
            <Range defaultValue={[0,40000]} min={0} max={40000} step={1000} onChange={this.handleRangeChange} tipFormatter={value => `${value}`}></Range>
          </div>
        </Panel>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={apiKey}
          mapStyle={styleJSON}
          onViewportChange={this.handleOnViewportChange}
          doubleClickZoom={false}>
            {
              Array.isArray(data) && 
              filter(data, (device) => last(device.measurement)[1] >= filterRange[0] && last(device.measurement)[1] <= filterRange[1])
              .map((device) =>
                <Marker offsetLeft={-14} offsetTop={10} key={device.lat + device.lng} latitude={device.lat} longitude={device.lng}>
                  <MarkerIcon measurement={last(device.measurement[1])}>
                    {
                      ({color}) => (
                        <svg onClick={this.onMarkerClick} data-id={device.name} alt={device.name} title={device.name} width="30px" viewBox='0 0 100 100'>
                          <path 
                            fill={color}
                            d='M51.9,0.2c4.9,1.2,7.8,5.1,11,8.5c8.7,9,17.3,18,25.9,27.1c4,4.2,4.4,9.8,1,14.5	C79.4,65.2,68.8,80.1,58.3,95c-4.9,6.8-14.1,6.6-18.7-0.4C29.6,79.5,19.7,64.4,9.9,49.3c-3.1-4.8-2.5-10.3,1.6-14.5	c9.3-9.5,18.7-18.9,27.9-28.4c2.6-2.6,5.2-5.2,8.9-6.2C49.5-0.1,50.5-0.1,51.9,0.2z'
                          />
                        </svg>
                      )
                    }
                  </MarkerIcon>
                </Marker>
              )
            }
            {this.renderPopup()}
        </ReactMapGL>
      </div>
    );
  }
}

MapContainer.propTypes = {
  apiKey: PropTypes.string
};

export default MapContainer;