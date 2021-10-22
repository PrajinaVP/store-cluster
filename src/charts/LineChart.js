// import React, { PureComponent } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useTheme } from '@mui/material/styles';
// import Title from '../Title';
// import { storeDataWithGeoCode } from '../data/StoreDataWithGeoCode';


// export default function Chart() {
//   const theme = useTheme();

//   // TODO Extract to util
//   // const [data, setData] = useState([]);
//   // // Read data from google sheets. Key = spread sheet key
//   // //https://docs.google.com/spreadsheets/d/1UU6hckJPlQLgOzCzeHoFUxSc_M8IQ0t7bbFMDSJd8Rs/edit#gid=282298582
//   // useEffect(() => {
//   //   Tabletop.init({
//   //     key: "1UU6hckJPlQLgOzCzeHoFUxSc_M8IQ0t7bbFMDSJd8Rs",
//   //     simpleSheet: true
//   //   })
//   //     .then((data) => setData(data))
//   //     .catch((err) => console.warn(err));
//   // }, []);

//   // console.log("\n data :: \n" + JSON.stringify(data));
//  // X-Axis - Zipcode
//  // Y-Axis - Annual Sales/ 
//   return (
//     <React.Fragment>
//       <Title>Line Chart</Title>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           width={500}
//           height={300}
//           data={storeDataWithGeoCode}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Address.PostalCode" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="Store.AnnualSales" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="Store.OperatingExpenses" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//     </React.Fragment>
//   );
// }

import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { Badge, Box, Container, Divider, IconButton, Grid, Paper, Link, List, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { mainListItems, secondaryListItems } from './listItems';
import LineChart from './charts/CustomizedLabelLineChart';
import CustomizedLabelLineChart from './charts/CustomizedLabelLineChart';
import Deposits from './Deposits';
import Orders from './Orders';
import Stores from './Stores';
import StoreClusterMapbox from './mapbox-clustering/StoreClusterMapbox';
import ScatterPlotChart from './charts/ScatterChart';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Rockstars
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

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          {/* TODO Extract Toolbar*/ }
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
                {/* Chart */}
                <Grid item xs={3} md={3} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50vh'
                  }}
                >
                  <CustomizedLabelLineChart />
                 {/* <Chart /> */}
                </Paper>
              </Grid>
              {/* Map */}
              <Grid item xs={3} md={3} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50vh'
                  }}
                >
                  <StoreClusterMapbox />
                  {/* <Mapbox /> */}
                </Paper>
              </Grid>
              {/* Scatter Plot */}
              <Grid item xs={3} md={3} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50vh'
                  }}
                >
                  <ScatterPlotChart />
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {/* Recent Deposits */}
              <Grid item xs={4} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  Nothing for now
                  <LineChart />
                </Paper>
              </Grid>
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

