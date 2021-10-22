import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiDataGrid-renderingZone": {
        "& .MuiDataGrid-row": {
          "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
        }
      }
    }
  })
);

const alternateRowStyle = {
  "& .MuiDataGrid-renderingZone": {
    "& .MuiDataGrid-row": {
      "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
    }
  }
}

const handleCellClick = (param, event) => {
 // console.log(param);
 // console.log(event);
  if (param.colIndex === 2) {
    event.stopPropagation();
  }
};

const handleRowClick = (param, event) => {
  console.log("Row:");
  console.log(param);
  console.log(event);
};

export const SizePaginationDataGrid = (props) => {
  
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(5);
  
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        //sx={...alternateRowStyle  }
        className={classes.root}
        rows={props.rows}
        columns={props.columns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]} // 100 is max for community version
        pageSize={pageSize}
        checkboxSelection
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
        components={{
          Toolbar: GridToolbar,
        }}
        paginationMode={"client"}
      />
    </div>
  );
}
