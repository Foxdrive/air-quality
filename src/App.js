import React from 'react';
import PropTypes from 'prop-types';

import AppContext from './context.js';
import Home from './Containers/Home';
import TopNav from './Components/Nav';
import FetchData from './api';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.requestData = this.requestData.bind(this);
    this._fetchData = this._fetchData.bind(this);
    this.state = {
      data: {},
      filterRange: [],
      filterDevices: (filterRange) => {
        this.setState({filterRange})
      }
    };
  }

  async _fetchData() {
    const resource = `http://aqa.unloquer.org:8086/query?db=aqa&epoch=s&q=`;
    const query = encodeURIComponent(`SELECT last("lng") AS "last_lng", last("lat") AS "last_lat", (0.4*last("pm10")) + (0.6*last("pm25")) AS "result" FROM "aqa"."autogen"././ WHERE time > now() - 24h GROUP BY time(30m)`);
    const request = await fetch(`${resource}${query}`);
    await request.ok && request.json()
    .then((theResponse) => this.setState({...this.state, theResponse: theResponse.results[0].series}));
  }

  requestData() {
    new FetchData()
    .requestData()
    .then((data) => {
        this.setState({...this.state, data})
      });
  }

  componentDidMount() {
    this._fetchData();
    this.requestData();
    setInterval((() => this.requestData()), 900000) 
  }

  render() {
    return (
      <main>
        <AppContext.Provider value={this.state}>
          <TopNav />
            <AppContext.Consumer>
              {(state) => <Home apiKey={this.props.apiKey} {...state}/>}
            </AppContext.Consumer>
        </AppContext.Provider>
      </main>
    );
  }
}

App.propTypes = {
  apiKey: PropTypes.string
}

export default App;
