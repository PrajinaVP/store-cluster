/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";

export default function FreeSoloAutoComplete() {
  const [formState, setFormState] = useState(null);
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    setFormState(data);
  };

  const handleChange = (e, newValue, reason) => {
    return newValue;
  };

  const handleInputChange = (e, data) => {
    return data;
  };

  return (
    <div style={{ width: 300 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="autocomplete"
          control={control}
          onChange={([e, data, reason]) => handleChange(e, data, reason)}
          onInputChange={(e, data) => handleInputChange(e, data)}
          defaultValue={""}
          as={
            <Autocomplete
              id="autocomplete"
              freeSolo
              autoSelect
              options={["option1", "option2", "another option"]}
              renderInput={params => (
                <TextField
                  {...params}
                  label="freeSolo"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          }
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <p>{formState && JSON.stringify(formState, null, 2)}</p>
    </div>
  );
}
