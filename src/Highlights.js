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
  { id: 'label'},
  { id: 'storeId', label: 'Store', minWidth: '30'},
  //{ id: 'storeRegionId', label: 'Region Id'},
  //{ id: 'storeDepartmentId', label: 'Department Id'},
 // { id: 'storeGroupId', label: 'Group Id'},
  { id: 'dollar', label: '$'},
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

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

  const rows = getHighlights(storeList);
  console.log("highlights :: " + JSON.stringify(rows));

  return (
      <TableContainer sx={{ width: '100%', height: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {/* <TableRow>
              <TableCell align="center" colSpan={2}>
                Min
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Max
              </TableCell>
            </TableRow> */}
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
  );
}


