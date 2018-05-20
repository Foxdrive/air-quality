import React from 'react';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styleJSON from '../../style.json';


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
    return (
      <div>
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={this.props.apiKey}
        mapStyle={styleJSON}
        onViewportChange={this.handleOnViewportChange}
      />
      </div>
    );
  }
}

MapContainer.propTypes = {
  apiKey: PropTypes.string
};

export default MapContainer;