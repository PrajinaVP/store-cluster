import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './components/Title';
import storesClusterByKmeans from './data/StoresClusterByKmeans';
import { getHighlights } from './util/util';

function preventDefault(event) {
  event.preventDefault();
}

export default function Highlights(props) {
  const storeList = props ? props.data : [];
  const highlights = getHighlights(storeList);
  console.log("highlights :: " + highlights);

  return (
    <React.Fragment>
      <Title>Operating Efficiency</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
