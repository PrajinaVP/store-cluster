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
    if (array) {
      return findMinMax(array);
    }
  }

  // Finding all here to reduce iteration
  function findMinMax(arr) {
    let minAnnualSales = arr[0].AnnualSales;
    let maxAnnualSales = arr[0].AnnualSales;
    let minAnnualSalesIndex;
    let maxAnnualSalesIndex;

    let minOpEfficiencyIndex;
    let maxOpEfficiencyIndex;
    let minOpEfficiency = arr[0].operatingEfficiency;
    let maxOpEfficiency = arr[0].operatingEfficiency;
    
    let minCostOfGoodsSoldIndex;
    let maxCostOfGoodsSoldIndex;
    let minCostOfGoodsSold = arr[0].CostOfGoodsSold;
    let maxCostOfGoodsSold = arr[0].CostOfGoodsSold;

    let minOperatingExpensesIndex;
    let maxOperatingExpensesIndex;
    let minOperatingExpenses = arr[0].OperatingExpenses;
    let maxOperatingExpenses  = arr[0].OperatingExpenses;

    for (let i = 1, len=arr.length; i < len; i++) {
      let annualSales = arr[i].AnnualSales;
      let opEfficiency = arr[i].OperatingEfficiency;
      let operatingExpenses = arr[i].OperatingExpenses;
      let costOfGoodsSold = arr[i].CostOfGoodsSold;

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

      if (operatingExpenses < minOperatingExpenses)  {
        minOperatingExpenses = opEfficiency;
        minOperatingExpensesIndex = i;
      };

      if (operatingExpenses < maxOperatingExpenses)  {
        maxOperatingExpenses = operatingExpenses;
        maxOperatingExpensesIndex = i;
      };

      if (costOfGoodsSold < minCostOfGoodsSold)  {
        minCostOfGoodsSold = costOfGoodsSold;
        minCostOfGoodsSoldIndex = i;
      };

      if (costOfGoodsSold < maxCostOfGoodsSold)  {
        maxCostOfGoodsSold = costOfGoodsSold;
        maxCostOfGoodsSoldIndex = i;
      };
      
    }
  
    const minMax = [
      { 
        storeId: arr[minAnnualSalesIndex].id,
        storeRegionId: arr[minAnnualSalesIndex].StoreRegionID,
        StoreDepartmentId: arr[minAnnualSalesIndex].StoreDistrictID,
        StoreGroupID: arr[minAnnualSalesIndex].StoreGroupID,
        dollar: arr[minAnnualSalesIndex].AnnualSales
      },
      { 
        storeId: arr[maxAnnualSalesIndex].id,
        StoreRegionID: arr[maxAnnualSalesIndex].StoreRegionID,
        StoreDepartmentId: arr[maxAnnualSalesIndex].StoreDistrictID,
        StoreGroupID: arr[maxAnnualSalesIndex].StoreGroupID,
        dollar: arr[maxAnnualSalesIndex].AnnualSales
      },

      // { 
      //   storeId: arr[minOpEfficiencyIndex].id,
      //   StoreRegionID: arr[minOpEfficiencyIndex].StoreRegionID,
      //   StoreDistrictID: arr[minOpEfficiencyIndex].StoreDistrictID,
      //   StoreGroupID: arr[minOpEfficiencyIndex].StoreGroupID,
      //   dollar: arr[minOpEfficiencyIndex].operatingEfficiency
      // },

      // { 
      //   storeId: arr[maxOpEfficiencyIndex].id,
      //   StoreRegionID: arr[maxOpEfficiencyIndex].StoreRegionID,
      //   StoreDistrictID: arr[maxOpEfficiencyIndex].StoreDistrictID,
      //   StoreGroupID: arr[maxOpEfficiencyIndex].StoreGroupID,
      //   dollar: arr[maxOpEfficiencyIndex].operatingEfficiency
      // },

      { 
        storeId: arr[minCostOfGoodsSoldIndex].id,
        StoreRegionID: arr[minCostOfGoodsSoldIndex].StoreRegionID,
        StoreDistrictID: arr[minCostOfGoodsSoldIndex].StoreDistrictID,
        StoreGroupID: arr[minCostOfGoodsSoldIndex].StoreGroupID,
        dollar: arr[minCostOfGoodsSoldIndex].CostOfGoodsSold
      },

      { 
        storeId: arr[maxCostOfGoodsSoldIndex].id,
        StoreRegionID: arr[maxCostOfGoodsSoldIndex].StoreRegionID,
        StoreDistrictID: arr[maxCostOfGoodsSoldIndex].StoreDistrictID,
        StoreGroupID: arr[maxCostOfGoodsSoldIndex].StoreGroupID,
        dollar: arr[maxCostOfGoodsSoldIndex].CostOfGoodsSold
      },

      { 
        storeId: arr[minOperatingExpensesIndex].id,
        StoreRegionID: arr[minOperatingExpensesIndex].StoreRegionID,
        StoreDistrictID: arr[minOperatingExpensesIndex].StoreDistrictID,
        StoreGroupID: arr[minOperatingExpensesIndex].StoreGroupID,
        dollar: arr[minOperatingExpensesIndex].OperatingExpenses
      },

      { 
        storeId: arr[maxOperatingExpensesIndex].id,
        StoreRegionID: arr[maxOperatingExpensesIndex].StoreRegionID,
        StoreDepartmentId: arr[maxOperatingExpensesIndex].StoreDistrictID,
        StoreGroupID: arr[maxOperatingExpensesIndex].StoreGroupID,
        dollar: arr[maxOperatingExpensesIndex].OperatingExpenses
      }


      //minAnnualSalesStore: arr[minAnnualSalesIndex],
      //maxAnnualSalesStore: arr[maxAnnualSalesIndex],
      //minOpEfficiencyStore: arr[minOpEfficiencyIndex],
      //maxOpEfficiencyStore: arr[maxOpEfficiencyIndex],
      //minCostOfGoodsSoldStore: arr[minCostOfGoodsSoldIndex],
      //maxCostOfGoodsSoldStore: arr[maxCostOfGoodsSoldIndex],
      //minOperatingExpensesSoldStore: arr[minOperatingExpensesIndex],
      //maxOperatingExpensesSoldStore: arr[maxOperatingExpensesIndex]
    ];

    return minMax;
  }

const maxVal = (array) => {
  var maximum = Math.max.apply(Math, array.map(o => o.attribute));
}



