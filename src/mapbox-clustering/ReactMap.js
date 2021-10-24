import React , { useEffect, useRef, useState } from 'react';
import {
  Circle,  
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

import Title from '../components/Title';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { storesClusterByKmeans } from '../data/StoresClusterByKmeans';

import Geocode from "react-geocode";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100%",
  width: "100%",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

let circle;
export default function ReactMap() {

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_JS_MAP_API_KEY); 
  Geocode.enableDebug();
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_JS_MAP_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const [zipcode, setZipcode] = useState([89074]);
const [radius, setRadius] = useState(100);
const [error, setError] = useState('');
const [center, setCenter] = useState({ lat: 36.0389897, lng: -114.9948827 });
//const [circle, setCircle] = useState(null);
const [storeList, setStoreList] = useState(storesClusterByKmeans);

// TODO Get zipcodes from api
const zipList = storesClusterByKmeans.map((option) => {
  if (option.PostalCode) {
      return option.PostalCode.split("-")[0];
  }
});

const handleChange = (event, values) => {
    console.log("event :: " + event);
    setZipcode(values);
};

const handleRadiusChange = (event) => {
    console.log("event target val :: " + event.target.value);
    setRadius(event.target.value);
    // circle.setRadius(radius);
};

const findByZipcodeRadius = (event) => {
    console.log("event :; " + event); 
    console.log("value :; " + event.target.value); 

    console.log(" zip :: " + JSON.stringify(zipcode));
    console.log(" radius :: " + radius);

    event.preventDefault();

    if (radius && !zipcode) {
      error = "Zipcode id required!"
    }
  };

const mapRef = useRef();
const onMapLoad = React.useCallback((map) => {
  mapRef.current = map;
}, []);

const apiIsLoaded = (map, maps) => {
    mapRef.current = map;
    //mapRef.current.setZoom(expansionZoom);
    //mapRef.current.panTo({ lat: latitude, lng: longitude});

    // circle = (new maps.Circle({
    //   strokeColor: "#FF0000",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#FF0000",
    //   fillOpacity: 0.3,
    //   map,
    //   center,
    //   radius: radius * 1000
    // }));
  };

const makeAPICall = async (url) => {
    try {
      console.log("make :: url :: " + url);
      fetch(url, {
        'methods': 'GET',
        headers: {
          'Content-Type': 'applications/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log("data :: " + JSON.stringify(data));
        setStoreList(data.data[zipcode]);// TODO Change python res
      })
      .catch(error => {
        console.log(error);
      });
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    console.log("effect zipcode :: " + zipcode + " radius :: " + radius);
    if (circle) {
      circle.setCenter(center);
      circle.setRadius(radius * 1000);
    }
    if (!zipcode) {
      console.log("error zipcode :: " + zipcode);
      //throw new Error("Zipcode is required!");
    }
    makeAPICall(`http://127.0.0.1:5000/api/v1/storesclustersbykmeansbylistzips?zipcode=${zipcode}&radius=${radius}`);
    Geocode.fromAddress(zipcode).then(
      response => {
        // setCenter({ lat: 33.614269, lng: -85.834969 });
        setCenter(response.results[0].geometry.location);
      }
    );

  }, [zipcode, radius]);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
 
  return (
  <React.Fragment>
    <Title>All Stores</Title> 
    <div style={{ height: "100%", width: "100%"}}>
 
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Autocomplete
            freeSolo
            id="free-solo-zipcode"
            value={zipcode}
            disableClearable
            //options={storesClusterByKmeans}
            //options={storesClusterByKmeans.map((option) => option.PostalCode)}
            options={zipList}
            //getOptionLabel={(option) => option}
            // getOptionSelected={(option, value) => {
            //   return option.id === value.id
            // }}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="PostalCode"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-number"
            label="Radius"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={radius}
            onChange={handleRadiusChange}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="find stores"
            onClick={findByZipcodeRadius}
            // sx={{
            //   marginRight: '36px',
            //   ...(open && { display: 'none' }),
            // }}
            >
            <SearchIcon />
            </IconButton>
        </Grid>
    </Grid>

    <div style={{ height: "80%", width: "100%"}}>
      {/* <Locate panTo={panTo} />
      <Search panTo={panTo} /> */}

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        panTo={center}
        //options={options}
        yesIWantToUseGoogleMapApiInternals
        //onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        //onClick={onMapClick}
        //onLoad={onMapLoad}
        onLoad={({ map, maps }) => apiIsLoaded(map, maps)}
     >
         {/* <Circle
            defaultCenter={center}
            radius={radius}
            options={{strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.3}}
        /> */}
         {storeList.map((store) => (
          <Marker
            key={store.id}
            position={{ lat: store.Latitude, lng: store.Longitude }}
            onClick={() => {
              setSelected(store);
            }}
            // Uncomment for custom store image
            // icon={{
            //   url: `/store.svg`,
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(15, 15),
            //   scaledSize: new window.google.maps.Size(30, 30),
            // }}
          />
        ))}
        <Circle
            defaultCenter={{ lat: 36.0389897, lng: -114.9948827 }}
            // radius={place.circle.radius}
            // options={place.circle.options}
            radius= {3000}
            options={{
                strokeColor: "#FF0000",
                fillColor: "#FF0000",
                fillOpacity: 0.1
            }}
        />
        {selected ? (
          <InfoWindow
            position={{ lat: selected.Latitude, lng: selected.Longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                Store
              </h2>
              <p>{JSON.stringify(selected, null, 2)}</p>
            </div>
          </InfoWindow>
        ) : null}   
    </GoogleMap>
      </div>  
    </div>
  </React.Fragment>   
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 43.6532, lng: () => -79.3832 },
//       radius: 100 * 1000,
//     },
//   });

//   // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("😱 Error: ", error);
//     }
//   };

//   return (
//     <div className="search">
//       <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }