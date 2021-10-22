import React, {Component } from 'react';
import {columns, rows} from './data/storeData';
import {SizePaginationDataGrid} from './components/SizePaginationFilterDataGrid';
import Title from './components/Title';
import {storesClusterByKmeans } from './data/StoresClusterByKmeans'



export default class Stores extends Component {
    constructor(props) {
        super(props);
    
        // this.state = {
        //     rows: {},
        //     cols: {},
        //     items:storesData
        // }
     }

    // getFileData(file) {
    //     //const stores = getFileData('/Users/prajina/workspace/dashboard/data/STORE_CLUSTERING_stores_zipcodes.xlsx');
    //     const stores = GetFileData('stores_zipcodes.xlsx');
    //     this.setState({
    //         rows: stores.rows,
    //         cols: stores.cols,
    //         items: stores
    //     })
        
    // }
    
  render() {

    // const storesWithGeometry = getStoreGeoCode(rows);
    const data = {
        rows: storesClusterByKmeans,
        columns
    }
    return (
        <React.Fragment>
            <Title>Stores</Title>
            <div style={{ height: "100%", width: "100%" }}>
                <SizePaginationDataGrid
                {...data} 
                //pageSize={10}
                />
            </div>
        </React.Fragment>
        );
    }
}