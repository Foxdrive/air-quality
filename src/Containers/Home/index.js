import React from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker }  from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styleJSON from '../../style.json';

import Panel from '../../Components/Panel';


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
    this._resize = this._resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
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

  render(props){
    const { apiKey, data } = this.props;
    return (
      <div>
        <Panel />
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={apiKey}
          mapStyle={styleJSON}
          onViewportChange={this.handleOnViewportChange}
          doubleClickZoom={false}
        >
          {Array.isArray(data) && data.map((device) =>
          (device.lat && device.lng) && 
            <Marker key={device.lat + device.lng} latitude={device.lat} longitude={device.lng}>
              <div style={{color: 'red'}}>Device location</div>
            </Marker>
          )}
        </ReactMapGL>
      </div>
    );
  }
}

MapContainer.propTypes = {
  apiKey: PropTypes.string
};

export default MapContainer;