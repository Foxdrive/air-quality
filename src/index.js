import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
require('dotenv').config();
ReactDOM.render(<App apiKey={process.env.REACT_APP_MAPBOX_KEY} tileset={process.env.REACT_APP_MAPBOX_STYLE} />, document.getElementById('root'));
