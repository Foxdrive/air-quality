import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import About from './Containers/About';
import Home from './Containers/Home';
import Help from './Containers/Help';
import Support from './Containers/Support';

import Nav from './Components/Nav';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Route exact path='/' render={() => <Home apiKey={this.props.apiKey} /> }></Route>
          <Route path='/about' component={About}></Route>
          <Route path='/help' component={Help}></Route>
          <Route path='/support' component={Support}></Route>
        </main>
      </Router>
    );
  }
}

App.propTypes = {
  apiKey: PropTypes.string
}

export default App;
