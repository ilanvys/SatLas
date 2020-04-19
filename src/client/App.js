import React, { Component } from 'react';
import './app.css';
import globeIcon from './satlas-logo.png'

export default class App extends Component {
  render() {
    return (
      <div id='background'>
        <div id='header'>
          <img src={globeIcon} alt='satlas' />
        </div>
        <div id='content'></div>
      </div>
    );
  }
}
