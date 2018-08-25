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
    this.state = {
      data: {},
      filterRange: [],
      filterDevices: (filterRange) => {
        this.setState({filterRange})
      }
    };
  }

  requestData() {
    new FetchData()
    .requestData()
    .then((data) => {
        this.setState({...this.state, data})
      });
  }

  componentDidMount() {
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
