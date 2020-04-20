import React, { Component } from 'react'
import './app.css'
import globeIcon from './satlas-logo.png'
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer } from 'react-leaflet'

const stamenTonerTiles = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png'
const mapCenter = [39.9528, -75.1638]
const zoomLevel = 12

export default class App extends Component {
  render() {
    return (
      <div id='background'>
         <div id='header'>
          <img src={globeIcon} alt='satlas' />
        </div>
          <Map
              ref={m => { this.leafletMap = m; }}
              center={mapCenter}
              zoom={zoomLevel}
          >
          <TileLayer
            url={stamenTonerTiles}
          />
          </Map>
      </div>
    )
  }
}
