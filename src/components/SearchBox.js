import React , { useEffect, useRef, useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { storesClusterByKmeans } from '../data/StoresClusterByKmeans';

//TODO Convert to component?
export default function SearchBox(zipcode, handleChange, radius, handleRadiusChange, findByZipcodeRadius) {
    // TODO Get zipcodes from api
    const zipList = storesClusterByKmeans.map((option) => {
        if (option.PostalCode) {
            return option.PostalCode.split("-")[0];
        }
    });

    return <Grid container spacing={2}>
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
              }} />
          )} />
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
          onChange={handleRadiusChange} />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="find stores"
          onClick={findByZipcodeRadius}
        >
          <SearchIcon />
        </IconButton>
      </Grid>
    </Grid>;
  }