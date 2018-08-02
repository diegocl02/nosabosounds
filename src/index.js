import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './redux/store'
// install redux and react-redux
// import the store and pass it as a prop the App

ReactDOM.render(<App store= {store} />, document.getElementById('root'));
