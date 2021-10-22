import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./style.css";

let circle;
class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: { lat: 40.756795, lng: -73.954298 },
      inputRad: 100
    };
  }

  onChange = e => {
    this.setState({
      inputRad: e.target.value
    });
  };
  changeRadius = () => {
    console.log(Number(this.state.inputRad));
    circle.setRadius(Number(this.state.inputRad));
  };

  render() {
    console.log(this.state.inputRad)
    const apiIsLoaded = (map, maps) => {
      circle = new maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        map,
        center: this.state.center,
        radius: this.state.inputRad
      });
    };
    return (
      <div>
        <div style={{ height: "400px", width: "100%" }}>
          <input
            placeholder="Enter radius"
            type="number"
            min="100"
            name="inputRad"
            onChange={this.onChange}
          />
          <input
            value="Change circle radius"
            type="submit"
            onClick={this.changeRadius}
          />
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "API_KEY",
              libraries: ["places"]
            }}
            defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
            defaultZoom={15}
            center={this.state.center}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          />
        </div>
      </div>
    );
  }
}
export default GoogleMaps;
