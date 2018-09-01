import React from 'react';
import PropTypes from 'prop-types';

import AppContext from './context.js';
import Home from './Containers/Home';
import TopNav from './Components/Nav';
import fetchDevices from './api';
import { REFRESH_REQUEST_INTERVAL } from './constants.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      filterRange: [],
      filterDevices: (filterRange) => {
        this.setState({filterRange})
      }
    };
  }

  componentDidMount() {
    fetchDevices().then((data) => this.setState({...this.state, data: data.results[0].series}))
    setInterval((() => this.requestData()), REFRESH_REQUEST_INTERVAL) 
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
