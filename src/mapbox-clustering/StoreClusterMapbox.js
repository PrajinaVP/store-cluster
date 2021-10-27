import React, { useState, useEffect, useRef } from "react";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./Mapbox.css";

import { storeDataWithGeoCode } from '../data/StoreDataWithGeoCode'
import Title from "../components/Title";

const fetcher = (...args) => fetch(...args).then(response => response.json());

async function getDataAsText(file) {
    const response = await fetch('/Users/prajina/workspace/dashboard/src/data/stores_zipcodes_geo.csv');
    const data = await response.text();
    // console.log(data);

    const rows = data.split('\n').slice(1);
   // console.log(rows);

    rows.forEach(rows => {
        const storeRow = rows.split(',')
    })

}

const Marker = ({children}) => children;

export default function StoreClusterMapBox() {
    // 1. map setup
    const mapRef = useRef();
    const [zoom, setZoom] = useState(10);
    const [bounds, setBounds] = useState(null);
    const [radius, setRadius] = useState(75);
    const [defaultCenter, setDefaultCenter]=useState({lat: 33.6, lng: -85.9});
 
    // 2. load and prepare/ format data
    // const url = 
    //     'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10';
    // const url = '../data/stores_zipcodes_geo.csv'
    // const {data, error} = useSwr(url, fetcher);
    // const stores = data && !error ? data : [];

    const stores = storeDataWithGeoCode;

   // console.log("\n\n ====\n stores here :: \n" + JSON.stringify(stores));
    //console.log("\n\n ====\n TEXT stores here :: \n" + getDataAsText(url));
    // Slice when showing individual markers as map loading slows down. No need to slice when clustering
    // const crimes = data && !error ? data.slice(0,200) : [];

    // TODO Remove when backend integrated
    // Temporary read from csv
    

    const points = stores.map(store => ({
        type: 'Feature',
        properties: {
            cluster: false,
            storeId: store.ID,
            zipcode: store["Address.PostalCode"]
        },
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(store.Longitude),
                parseFloat(store.Latitude)
            ]
        }
    }))

    // console.log("\n == \n points :: " + JSON.stringify(points));

   
    // 3. get clusters
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: {radius, maxZoom: 20}
    })

    // Marker Info
    const { selectedCluster, setSelectedCluster} = useState(null);

  const AnyReactComponent = ({text}) => <div>{text}</div>;
  
    // return map
    const center = { lat: 33.6, lng: -85.9 };
    return (
        <React.Fragment>
            <Title>Cluster by Zipcode</Title>
            <div style={{ height: "100%", width: "100%"}}> 
                <div style={{ height: "10%", width: "100%"}}> 
                </div>
                <div style={{ height: "80%", width: "100%"}}> 
                <GoogleMapReact 
                    bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_JS_MAP_API_KEY}}
                    defaultCenter={center}
                    defaultZoom={1}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map}) => {
                        mapRef.current = map;
                    }}
                    onChange={({ zoom, bounds }) => {
                        setZoom(zoom);
                        setBounds([
                            bounds.nw.lng,
                            bounds.se.lat,
                            bounds.se.lng,
                            bounds.nw.lat
                        ]);
                    }}
                    
                >
                        {clusters.map(cluster => {
                            const [longitude, latitude] = cluster.geometry.coordinates;
                            const {
                                cluster: isCluster, 
                                point_count: pointCount
                            } = cluster.properties;

                            if (isCluster) {
                                return (
                                    <Marker key={cluster.id} lat={latitude} lng={longitude}>
                                        <div 
                                            className="cluster-marker"
                                            style={{
                                                width: `${10 * (pointCount / points.length) * 5}px`,
                                                height: `${10 * (pointCount / points.length) * 5}px`,
                                            }}
                                            onClick={() => {
                                                const expansionZoom = Math.min(
                                                    supercluster.getClusterExpansionZoom(cluster.id),
                                                    20
                                                );
                                                mapRef.current.setZoom(expansionZoom);
                                                mapRef.current.panTo({ lat: latitude, lng: longitude});
                                            }}
                                        >
                                            {pointCount}
                                        </div>
                                    </Marker>
                                );
                            }

                            return (
                                <Marker
                                    key={cluster.properties.storeId}
                                    //title={cluster.properties.crimeId}
                                    lat={latitude}
                                    lng={longitude}
                                >        
                                {/* // TODO COnvert to poop un and display only on click                         */}
                                    {/* <AnyReactComponent
                                        lat={latitude}
                                        lng={longitude}
                                        text="My Marker"
                                    /> */}
                                    <button className='map-marker'
                                        // onClick={e => {
                                        //     e.preventDefault();
                                        //     setSelectedCluster(cluster)
                                        // }}
                                        >
                                        <img src="/store.svg" alt="store" />
                                    </button>
                                </Marker>
                                )
                            })}

                        {/* {selectedCluster ? (
                        <AnyReactComponent
                            latitude={selectedCluster.geometry.latitude}
                            longitude={selectedCluster.geometry.latitude}
                            onClose={() => {
                                setSelectedCluster(null);
                            }}
                        >
                            <div>
                                <h2>{selectedCluster.properties.crimeId}</h2>
                                <p>{selectedCluster.properties.category}</p>
                            </div>
                        </AnyReactComponent>
                        ) : null} */}

                    
                    {/* // Individual marker
                    {crimes.map(crime => (
                        <Marker
                            key={crime.id}
                            lat={crime.location.latitude}
                            lng={crime.location.longitude}
                        >
                            <button className='crime-marker'>
                                <img src="/custody.svg" alt="Crime Crime" />
                            </button>
                        </Marker>
                    ))} */}
                    </GoogleMapReact>
                </div>
            </div>
        </React.Fragment>
    );
  }
