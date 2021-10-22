import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { storesClusterByKmeans } from '../data/StoresClusterByKmeans';
import { groupBy } from '../util/util';
import './Chart.css';
import Title from '../components/Title'


// Filter by zipcode


// Group by cluster
const clusters = groupBy(storesClusterByKmeans, 'cluster');
// console.log("cluster :: "+ JSON.stringify(clusters));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {

    return (
      <div className="tooltip">
        {/* const { payload } = payload[0];
        console.log(`Store Id : ${payload.ID}`)
        console.log(`StoreGroupID : ${payload["StoreGroupID"]}`); */}

        <p>{`Store Id : ${payload[0].payload.id}`}</p>
        <p>{`District Id : ${payload[0].payload["StoreDistrictID"]}`}</p>
        <p>{`Group Id : ${payload[0].payload["StoreGroupID"]}`}</p>
        <p>{`Region Id : ${payload[0].payload["StoreRegionID"]}`}</p>
        
        <p>{`Annual Sales : ${payload[0].payload["AnnualSales"]}`}</p>
        <p>{`Cost of Goods Sold : ${payload[0].payload["CostOfGoodsSold"]}`}</p>
        <p>{`Operating Expenses : ${payload[0].payload["OperatingExpenses"]}`}</p>
        
        <p>{`Address : ${payload[0].payload["FormattedAddress"]}`}</p>
        <p>{`Postal Code : ${payload[0].payload["PostalCode"]} `}</p>
      </div>
    );
    
  }

  return null;
};

export default class ScatterPlotChart extends PureComponent {
// X-axis - Operation Eff     "AnnualSales": 5755785,  "CostOfGoodsSold": 2749676, 

// Y-Axis - Annual Sales     "AnnualSales": 5755785, 
//TODO Use all data 
  render() {
    return (
      <React.Fragment>
        <Title>Annual Sales vs Operating Efficiency</Title>
        <ResponsiveContainer width="100%" height="100%">
           <ScatterChart width="100%" height="100%"
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              label={{ value: 'Annual Sales ($)', position: 'bottom', offset: 0 }}
              type="number" 
              dataKey="AnnualSales" 
              name="storeAnnualSales" 
              //unit="$" 
              domain={[4000000, 8000000]}
              tickCount={10}
              tickFormatter={ 
                number => {
                  //TODO Fix duplicate values issue with rounding
                  // return (number > 0 ? Math.ceil : Math.floor)(number/1000000*2)/2
                  //return (Math.round((number/1000000)*2)/2).toFixed(2);
                  return `${(number/1000000).toFixed(2)}M`;
                }
              }
            />
            <YAxis 
              label={{ value: 'Operating Efficiency', angle: -90, position: 'insideBottomLeft' }}
              type="number" 
              dataKey="operatingEfficiency" 
              name="operatingEfficiency" 
              //unit="" 
              domain={[0,1]}
              tickCount={10}
              tickFormatter={number => number.toFixed(1)}
              />
            <ZAxis dataKey="ID" range={[5, 24]} name="storeId" />
            <Tooltip content={<CustomTooltip />} />
            {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
            <Legend verticalAlign="top" />
            <Scatter name="cluster1" data={clusters[0]} fill="#8884d8" />
            <Scatter name="cluster2" data={clusters[1]} fill="#82ca9d" />
            <Scatter name="cluster3" data={clusters[2]} fill="blue" />
          </ScatterChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}

