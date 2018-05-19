import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import About from './Components/About';
import Home from './Components/Home';
import Help from './Components/Help';
import Support from './Components/Support';

class App extends Component {
  render() {
    return (
      <Router>
        <main>
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
