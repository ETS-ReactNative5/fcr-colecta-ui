import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react';

export default class PlacesMap extends Component {
  constructor(props) {
    super(props)
    this.state = {map: {}, maps: {}, selectedPlace: ""}
    this.rerenderMarkers = this.rerenderMarkers.bind(this)
  }

  rerenderMarkers() {
    if (this.state.map) {
      this.renderMarkers(this.state.map, this.state.maps)
    }
  }

  renderMarkers = (map, maps) => {
    this.setState({map: map, maps: maps})
    this.props.places.forEach(place => {
        let marker = new maps.Marker({
          position: {lat: place.latitude, lng: place.longitude},
          title: place.name,
          placeId: place.id,
          map
        })
        marker.addListener('click', function () {
          //this.setState({selectedPlace: marker.placeId})
        });
      }
    )
  }

  render() {

    return (
      <div style={{height: '500px', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyDCEEtEPWvLwrP-M0nJz4MeIRtRa_wiuJk"}}
          center={this.props.coordinates}
          defaultZoom={13}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          onChange={this.rerenderMarkers}
          yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMapReact>
      </div>
    )
  }
}