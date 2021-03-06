import React, { Component } from 'react';
import { Map, Polygon, GeometryLayer } from "./SatLasMap";
import './app.css';
import globeIcon from './satlas-logo.png'

export default class App extends Component {
  render() {
    return (
      <div id='background'>
        <div id='header'>
          <img src={globeIcon} alt='satlas' />
        </div>
        <div id='content'>
          <Map>
            <GeometryLayer name="hello">
              <Polygon
                radius={2000}
                center={[50, 0]}
                attribution="hello"
              />
              <Polygon
                radius={2000}
                center={[51, 0]}
                attribution="hello"
              />
            </GeometryLayer>
            <Polygon
              radius={2000}
              center={[53, 0]}
              attribution="hello"
            />
          </Map>
        </div>
      </div>
    )
  }
}
