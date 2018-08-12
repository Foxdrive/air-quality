import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppContext from './context.js';

import About from './Containers/About';
import Home from './Containers/Home';
import Help from './Containers/Help';
import Support from './Containers/Support';

import TopNav from './Components/Nav';

import FetchData from './api';

class App extends Component {

  constructor(props) {
    super(props);
    this.requestData = this.requestData.bind(this);
    this.state = {
      data: {}
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
      <Router>
        <main>
          <AppContext.Provider value={this.state.data}>
            <TopNav />
              <Route exact path='/' render={() => 
                <AppContext.Consumer>
                  {(data) => <Home apiKey={this.props.apiKey} data={data} />}
                </AppContext.Consumer>
              }>
            </Route>
            <Route path='/about' component={About}></Route>
            <Route path='/help' component={Help}></Route>
            <Route path='/support' component={Support}></Route>
          </AppContext.Provider>
        </main>
      </Router>
    );
  }
}

App.propTypes = {
  apiKey: PropTypes.string
}

export default App;
