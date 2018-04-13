import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

export default class PlacesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {map: null, maps: null};
  };

  rerenderMarkers = () => {
    if (this.state.map) {
      this.renderMarkers(this.state.map, this.state.maps);
    }
  };

  renderMarkers = (map, maps) => {
    this.setState({map: map, maps: maps}, () => {
      this.props.places.forEach(place => {
          let marker = new maps.Marker({
            position: {lat: place.latitude, lng: place.longitude},
            title: place.name,
            placeId: place.id,
            map
          });
          marker.addListener('click', () => {this.setSelectedPlace(marker)});
        }
      );
    });
  };

  setSelectedPlace = (marker) => {
    this.props.onPlaceSelected({id: marker.placeId, name: marker.title});
  };

  render() {

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