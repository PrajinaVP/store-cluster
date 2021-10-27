import React , { useEffect, useRef, useState } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { Avatar, Badge, Box, Container, Divider, IconButton, Grid, Paper, Link, List, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Highlight, Language, Settings } from "@mui/icons-material";
import { deepPurple } from '@mui/material/colors';
import rockstars from './images/rockstars.jpg'
import ScatterChart from './charts/ScatterChart';

import Highlights from './Highlights';
import Stores from './Stores';

import StoreClusterMapbox from './mapbox-clustering/StoreClusterMapbox';
import MarkerMapLocator from './mapbox-clustering/MarkerMapLocator';
import ReactMap from './mapbox-clustering/ReactMap';
import MarkerMapLocator_radius from './mapbox-clustering/MarkerMapLocator_radius'
import GoogleApiWrapper from './mapbox-clustering/GoogleMapSMarkerMap'
import CustomGoogleMap from './components/CustomGoogleMap';

import { storesClusterByKmeans } from './data/StoresClusterByKmeans';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // For Map
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
        setStoreList(data[zipcode]);// TODO Change python res
        setCenter({ lat: data.center[0], lng: data.center[1]})  
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
    // if (circle) {
    //   circle.setCenter(center);
    //   circle.setRadius(radius * 1000);
    // }
    if (!zipcode) {
      console.log("error zipcode :: " + zipcode);
      //throw new Error("Zipcode is required!");
    }
    makeAPICall(`http://127.0.0.1:5000/api/v1/storesclustersbykmeansbylistzips?zipcode=${zipcode}&radius=${radius}`);

  }, []);
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Rockstars
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Language />
            </IconButton>
            <IconButton color="inherit">
              <Settings />
            </IconButton>
            <Avatar
              alt="Rockstars"
              src={rockstars}
              sx={{ bgcolor: deepPurple[500] }}
            />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '40vh',
                  }}
                >
                  <ScatterChart />
                  {/* <Chart /> */}
                </Paper>
              </Grid>
              {/* Highlights */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '40vh',
                  }}
                >
                  <Highlights data={storeList} />
                </Paper>
              </Grid>
               {/* Map */}
              {/* google-map-react and google-maps-react not working well together. map does not load, only markers */}
              {/* <Grid item xs={3} md={3} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50vh'
                  }}
                >
                  <GoogleApiWrapper />
                </Paper>
              </Grid> */}


              {/* TODO Uncomment below. */}
               <Grid item xs={3} md={3} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '70vh'
                  }}
                >
                  <StoreClusterMapbox />
                </Paper>
              </Grid>

              
              <Grid item xs={6} md={6} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '70vh'
                  }}
                >
                  <ReactMap 
                    data={storeList} 
                    zipcode
                    radius
                  />
                  {/* <MarkerMapLocator /> */}
                </Paper>
              </Grid>

              {/* <Grid item xs={6} md={6} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50vh'
                  }}
                >
                  <MarkerMapLocator_radius />
                </Paper>
              </Grid> */}
              {/* Stores*/}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Stores />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
