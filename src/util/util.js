import Geocode from "react-geocode";

export const getDataAsJson = (...args) => 
    fetch(...args)
    .then(response => response.json());

export const getDataAsText = (...args) => 
    fetch(...args)
    .then(response => response.text());

export const groupBy = (array, key) => {
   // console.log("cluster groupBy :: "+ key)
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };   
  
  // Get latitude & longitude from address.
export const geocode = ((address) => {
  Geocode.fromAddress(address).then(
    (response) => {
      console.log(response.results[0].geometry.location);
      return response.results[0].geometry.location;
    },
    (error) => {
      console.error(error);
    }
  )
}, {});

  export const getHighlights = (array) => {
    return findMinMax(array);
  }

  // Finding all here to reduce iteration
  function findMinMax(arr) {
    let minAnnualSales = arr[0].AnnualSales;
    let maxAnnualSales = arr[0].AnnualSales;
    let minAnnualSalesIndex;
    let maxAnnualSalesIndex;

    let minOpEfficiencyIndex;
    let maxOpEfficiencyIndex;
    let minOpEfficiency = arr[0].OperatingEfficiency;
    let maxOpEfficiency = arr[0].OperatingEfficiency;
    
    for (let i = 1, len=arr.length; i < len; i++) {
      let annualSales = arr[i].AnnualSales;
      let opEfficiency = arr[i].OperatingEfficiency;

      if (annualSales < minAnnualSales)  {
        minAnnualSales = annualSales;
        minAnnualSalesIndex = i;
      };

      if (annualSales > maxAnnualSales) {
        maxAnnualSales = annualSales;
        maxAnnualSalesIndex = i;
      } 

      if (opEfficiency < minOpEfficiency)  {
        minOpEfficiency = opEfficiency;
        minOpEfficiencyIndex = i;
      };

      if (opEfficiency < maxOpEfficiency)  {
        maxOpEfficiency = opEfficiency;
        maxOpEfficiencyIndex = i;
      };
    }
  
    return { 
      minAnnualSalesStore: arr[minAnnualSalesIndex],
      maxAnnualSalesStore: arr[maxAnnualSalesIndex],
      minOpEfficiencyStore: arr[minOpEfficiencyIndex],
      maxOpEfficiencyStore: arr[maxOpEfficiencyIndex]
    };
  }

const maxVal = (array) => {
  var maximum = Math.max.apply(Math, array.map(o => o.attribute));
}



