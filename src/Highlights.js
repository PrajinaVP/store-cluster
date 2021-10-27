import React, {useEffect} from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Title from './components/Title';
import { storesClusterByKmeans } from './data/StoresClusterByKmeans';
import { getHighlights } from './util/util';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function preventDefault(event) {
  event.preventDefault();
}


function getHighights(props) {
  const storeList = props ? props.data : storesClusterByKmeans;
  const highlights = getHighlights(storeList);
  console.log("highlights :: " + JSON.stringify(highlights));

  const maxAnnualSalesStore = highlights.maxAnnualSalesStore;
  const minAnnualSalesStore = highlights.minAnnualSalesStore;

  const minOpEfficiencyStore = highlights.minOpEfficiencyStore;
  const maxOpEfficiencyStore = highlights.maxOpEfficiencyStore;

}

const columns = [
  { id: 'id', label: 'Store Id'},
  { id: 'storeRegionId', label: 'Region Id'},
  { id: 'storeDepartmentId', label: 'Department Id'},
  { id: 'storeGroupId', label: 'Group Id'},
  { id: 'dollar', label: '$'},
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];


export default function Highlights(props) {
  // useEffect(() => {
  //   console.log("effect highlights");
  //   const storeList = props ? props.data : storesClusterByKmeans;
  //  if (storeList) {
  //   getHighights(props);
  //  }
   
  // }, []);

  //const storeList = props ? props.data : storesClusterByKmeans;
  const storeList = storesClusterByKmeans;

  const highlights = getHighlights(storeList);
  console.log("highlights :: " + JSON.stringify(highlights));
  
  const rows = highlights;
  
  // const columns = [
  //   {
  //     field: 'minAnnualSalesStore',
  //     headerName: 'Min Annual Sales',
  //     headerClassName: 'super-app-theme--header',
  //     headerAlign: 'center',
  //   },
  //   {
  //     field: 'maxAnnualSalesStore',
  //     headerName: 'Max Annual Sales',
  //     headerClassName: 'super-app-theme--header',
  //     headerAlign: 'center',
  //   },
  // ];

  const data = {
    rows: storesClusterByKmeans,
    columns
  } 

  return (
    <React.Fragment>
     {/* <Title>Highlights</Title> */}
     <React.Fragment sx={{ width: '100%', height: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Min
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Max
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>

    {/*  //   <Title>Annual Sales</Title>
    //   <Typography component="p" variant="h4">
    //     Store Id: {maxAnnualSalesStore.id}
    //     Annual Sales: {maxAnnualSalesStore.AnnualSales}
    //   </Typography>
    //   <Typography color="text.secondary" sx={{ flex: 1 }}>
    //     on 15 March, 2019
    //   </Typography>
    //   <div>
    //     <Link color="primary" href="#" onClick={preventDefault}>
    //       View balance
    //     </Link>
    //   </div>
    // </React.Fragment> */}

     
        {/* <Card variant="outlined">
          <CardHeader> Highlights </CardHeader>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Max Annual Sales
            </Typography>
          
            <Typography variant="body2">
              Store Id: {maxAnnualSalesStore.id} 
              <br />
              Region Id: {maxAnnualSalesStore.AnnualSales}
              <br />
              Annual Sales: {maxAnnualSalesStore.AnnualSales}
            </Typography>
     
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Min Annual Sales
            </Typography>
          
            <Typography variant="body2">
              Store Id: {minAnnualSalesStore.id} 
              <br />
              Region Id: {minAnnualSalesStore.AnnualSales}
              <br />
              Annual Sales: {minAnnualSalesStore.AnnualSales}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>  */}
        
    </React.Fragment>
  );
}


