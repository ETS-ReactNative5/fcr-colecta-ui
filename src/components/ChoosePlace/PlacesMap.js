import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import mRed from '../../images/marker_red.png';
import mGreen from '../../images/marker_green.png'

export default class PlacesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      maps: null};
    this.markers = [];
  };

  rerenderMarkers = () => {
    if (this.state.map) {
      this.renderMarkers(this.state.map, this.state.maps);
    }
  };

  markerIcon = (color) => {
    return {
      url: color === 'red' ? mRed : color === 'green' ? mGreen : ''
    }
  }

  renderMarkers = (map, maps) => {
    let callback = () => {
      this.markers = this.props.places.map(place => {
          let marker = new maps.Marker({
            position: {lat: place.latitude, lng: place.longitude},
            name: place.name,
            placeId: place.id,
            locationId: place.locationId,
            icon: this.markerIcon(this.props.currentPlace.id === place.id ? 'green' : 'red'),
            map
          });
          marker.addListener('click', () => {this.setSelectedPlace(marker)});
          return marker;
        }
      );
    }
    if (this.state.map) {
      callback();
    } else {
      this.setState({map: map, maps: maps}, callback);
    }
  };

  setSelectedPlace = (selectedMarker) => {
    this.markers.forEach(marker => {
      if (marker.placeId !== selectedMarker.placeId) {
        marker.setIcon(this.markerIcon('red'));
      } else {
        marker.setIcon(this.markerIcon('green'));
      }
    });
    let selectedPlace = {
      id: selectedMarker.placeId,
      name: selectedMarker.name,
      locationId: selectedMarker.locationId
    };
    this.props.onPlaceSelected(selectedPlace);
  };

  render() {
    this.rerenderMarkers();
    return (
      <div style={{height: '576px', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyDCEEtEPWvLwrP-M0nJz4MeIRtRa_wiuJk",
            language: 'es',
            region: 'EC'
          }}
          center={this.props.coordinates}
          defaultZoom={13}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          onChange={this.rerenderMarkers}
          yesIWantToUseGoogleMapApiInternals
        />
      </div>
    )
  };
}