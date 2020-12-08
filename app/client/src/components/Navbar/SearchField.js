import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "25vw",
    },
    paper: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    groupLabel: {
      textTransform: "uppercase",
      textAlign: "center",
      backgroundColor: theme.palette.secondary.main,
      color: "#777",
      margin: "0px auto",
      width: "80%",
      letterSpacing: 2,
      padding: 0,
      lineHeight: "normal",
    },
    noOptions: {
      backgroundColor: theme.palette.primary.main,
    },
    focused: {
      outline: "2px solid blue",
    },
  };
});

export default function SearchField() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const records = [
    { group: "Records", title: "Lovely Record" },
    { group: "Records", title: "Beautiful Sky" },
    { group: "Artists", title: "The Musicmakers" },
    { group: "Genres", title: "Techno" },
  ];

  const options = records.map((option) => {
    return { ...option };
  });

  const handleOpen = () => {
    inputValue.length > 0 && setOpen(true);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <Autocomplete
        open={open}
        onOpen={handleOpen}
        onClose={() => {
          setOpen(false);
        }}
        noOptionsText={"No Results"}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        selectOnFocus
        popupIcon={null}
        classes={{
          root: classes.root,
          groupLabel: classes.groupLabel,
          paper: classes.paper,
          options: classes.options,
          noOptions: classes.noOptions,
          groupUl: classes.groupUl,
          focused: classes.focused,
        }}
        className={classes.root}
        options={options}
        groupBy={(option) => option.group}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
            placeholder="search..."
            size="small"
            variant="outlined"
          ></TextField>
        )}
      ></Autocomplete>
    </div>
  );
}
