import React , { Component, useRef, useState } from 'react';
import useSWR from 'swr';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import './Mapbox.css'
import Title from '../components/Title';
import { storesClusterByKmeans } from '../data/StoresClusterByKmeans';
// google-maps-react is better performance for markers >=10000, no cluster or custom react component
//https://stackoverflow.com/questions/59361738/difference-between-google-map-react-and-google-maps-react
//google-maps-react mainly focuses on drawing geometric shapes like marker, infowindow, polyline, polygon or circle. They also offer lazy loading for the maps. 
//google-map-react renders a map where you can put a customized react component in any co-ordinate. Both libraries can be used to implement API services like autocomplete or direction-services. 

const fetcher = (...args) => fetch(...args).then(response => response.json());
// TODO move to .css
const mapStyles = {
  width: "100%",
  height: "100%"
};

class MapContainer extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      stores: [
        { lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.5524695, longitude: -122.0425407 }
      ]
    };
  }
  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          onClick={() => console.log("Clicked me..!")}
        />
      );
    });
  };
  render() {
    return (
      <React.Fragment>
        <Title>Google MapS Stores</Title> 
        <div style={{ height: "50vh", width: "100%"}}>
          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176 }}
          >
            {this.displayMarkers()}
          </Map>
        </div>
      </React.Fragment>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_JS_MAP_API_KEY
})(MapContainer);