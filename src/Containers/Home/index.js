import React from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import moment from 'moment';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'rc-slider/assets/index.css';


import { VictoryChart, VictoryLabel, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryArea } from 'victory';
import last from 'lodash/last'
import find from 'lodash/find'
import inRange from 'lodash/inRange'
import Slider from 'rc-slider';
import styleJSON from '../../style.json';
import Panel from '../../Components/Panel';
import MarkerIcon from '../../Components/MarkerIcon'
import './home.styles.css';

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
    this._calculateData = this._calculateData.bind(this);
  }

  componentDidMount() {
    this.props.filterDevices([0, 5]);
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
          longitude={last(device.values)[1]}
          latitude={last(device.values)[2]}
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
                data={device.values.map(dataset => {
                  const roundedData = Math.round(dataset[3]);
                  return {x: moment.unix(dataset[0]), y: roundedData, label: roundedData}
                })}
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

  _calculateData(dataset) {
    const colorsTable = {
      1: '#9f0',
      2: '#fc0',
      3: '#f60',
      4: '#f00',
      5: '#f06'
    };
    const ranges = {
      pm25: [
        [0, 24], 
        [24, 42],
        [42, 54],
        [54, 65],
        [65, Infinity]
      ],
      pm10: [
        [0, 34], 
        [34, 59],
        [59, 76],
        [76, 92],
        [92, Infinity]
      ]
    };
    const pm10Value = ranges.pm10.indexOf(ranges.pm10.find((range) => inRange(dataset[3], range[0], range[1]))) + 1;
    const pm25Value = ranges.pm25.indexOf(ranges.pm25.find((range) => inRange(dataset[4], range[0], range[1]))) + 1;
    const finalValue = Math.round((0.4*pm10Value) + (0.6*pm25Value));
    return [finalValue, colorsTable[finalValue]];
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
            <Range defaultValue={[1,5]} min={1} max={5} step={1} onChange={this.handleRangeChange} tipFormatter={value => `${value}`}></Range>
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
              data.map((device) => {
                const lastPosition = last(device.values);
                const weightedData = this._calculateData(lastPosition);
                return (
                  (lastPosition[1] && lastPosition[2] !== null) && inRange(weightedData[0], filterRange[0], filterRange[1] + 1) &&
                    <Marker offsetLeft={-14} offsetTop={10} key={lastPosition[1] + lastPosition[2]} latitude={lastPosition[2]} longitude={lastPosition[1]}>
                      <MarkerIcon measurement={lastPosition[3]}>
                        {
                          () => (
                            <svg onClick={this.onMarkerClick} data-id={device.name} alt={device.name} title={device.name} width="30px" viewBox='0 0 100 100'>
                              <path 
                                fill={weightedData[1]}
                                d='M51.9,0.2c4.9,1.2,7.8,5.1,11,8.5c8.7,9,17.3,18,25.9,27.1c4,4.2,4.4,9.8,1,14.5	C79.4,65.2,68.8,80.1,58.3,95c-4.9,6.8-14.1,6.6-18.7-0.4C29.6,79.5,19.7,64.4,9.9,49.3c-3.1-4.8-2.5-10.3,1.6-14.5	c9.3-9.5,18.7-18.9,27.9-28.4c2.6-2.6,5.2-5.2,8.9-6.2C49.5-0.1,50.5-0.1,51.9,0.2z'
                              />
                            </svg>
                          )
                        }
                      </MarkerIcon>
                    </Marker>
                )
              }
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