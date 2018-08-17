import React from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker }  from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'rc-slider/assets/index.css';


import last from 'lodash/last'
import filter from 'lodash/filter';
import Slider from 'rc-slider';


import styleJSON from '../../style.json';
import AppContext from '../../context.js';
import Panel from '../../Components/Panel';

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
      }
    };

    this.handleOnViewportChange = this.handleOnViewportChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
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
            <Range min={0} max={40000} step={1000} onChange={this.handleRangeChange} tipFormatter={value => `${value}`}></Range>
          </Panel>
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={apiKey}
            mapStyle={styleJSON}
            onViewportChange={this.handleOnViewportChange}
            doubleClickZoom={false}
          >
              {Array.isArray(state.data) && filter(state.data, (device) => last(device.measurement)[1] >= state.filter[0] && last(device.measurement)[1] <= state.filter[1]).map((device) =>
                <Marker key={device.lat + device.lng} latitude={device.lat} longitude={device.lng}>
                  <div style={{color: 'red'}}>Device location</div>
                </Marker>
              )}
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