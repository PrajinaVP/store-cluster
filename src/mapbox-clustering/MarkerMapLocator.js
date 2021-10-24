import React , { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './Mapbox.css'
import Title from '../components/Title';
import { storesClusterByKmeans } from '../data/StoresClusterByKmeans';
import GoogleMapPlaces from '../components/GoogleMapPlaces';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const Marker = ({children}) => children;
let circle;

export default function MarkerMapLocator() {
    // 1. map setup
    const mapRef = useRef();
    const [zoom, setZoom] = useState(10);
    const [bounds, setBounds] = useState(null);

    // 2. load and format data
    var stores = storesClusterByKmeans ? storesClusterByKmeans : [];
    // const url = "http://127.0.0.1:5000/api/v1/storesclustersbykmeansbylistzips?zipcode=30080,75000&radius=12",
    // const { data, error } = useSWR(url, fetcher);
    // const stores = data && !error ? data : [];
 
    // 3. get clusters

    // 4. render app
    const libraries = ["places"];
    const [zipcode, setZipcode] = useState([89074]);
    const [radius, setRadius] = useState(100);
    const [error, setError] = useState('');
    const [center, setCenter] = useState({lat: 33.6, lng: -85.9  });
  

    const [storeList, setStoreList] = useState(null);

    const handleChange = (event, values) => {
      console.log("event :: " + event);
      setZipcode(values);
    };

    const handleRadiusChange = (event) => {
      console.log("event target val :: " + event.target.value);
      setRadius(event.target.value);
      circle.setRadius(radius);
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

    // TODO Get zipcodes from api
    const zipList = storesClusterByKmeans.map((option) => {
      if (option.PostalCode) {
        return option.PostalCode.split("-")[0];
      }
    });

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
         // console.log("data :: " + JSON.stringify(data));
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
        circle.setRadius(radius);
      }
      if (!zipcode) {
        console.log("error zipcode :: " + zipcode);
        //throw new Error("Zipcode is required!");
      }
      makeAPICall(`http://127.0.0.1:5000/api/v1/storesclustersbykmeansbylistzips?zipcode=${zipcode}&radius=${radius}`);

    }, [zipcode, radius]);

    const apiIsLoaded = (map, maps) => {
      circle = new maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        map,
        center,
        radius
      });
    };

   const mapMarker = storeList ? storeList.map(store => (
    <Marker
        key={store.id}
        lat={store.Latitude}
        lng={store.Longitude}
    >
      <button className="map-marker">
        <img src="/store.svg" />
      </button>

    </Marker>
  )) : [];

    return (
        <React.Fragment>
            <Title>All Stores</Title> 
            <div style={{ height: "100%", width: "100%"}}>
              {/* <div style={{ height: "20%", width: "100%"}}>
                <GoogleMapPlaces />
              </div> */}
              {/* <FreeSoloAutoComplete />
             */}
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
               <GoogleMapReact 
                      bootstrapURLKeys={
                        { key: process.env.REACT_APP_GOOGLE_JS_MAP_API_KEY },
                        libraries
                      }
                      //defaultCenter
                      center={center}
                      defaultZoom={1}
                      yesIWantToUseGoogleMapApiInternals
                      onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                  >
                    {mapMarker}
                  </GoogleMapReact>
                </div>  
            </div>
        </React.Fragment>    
    );
}