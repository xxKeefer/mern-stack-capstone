import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { Popper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { primary, secondary },
  } = theme;
  return {
    root: {
      width: "25vw",
      [breakpoints.down("md")]: {
        width: "80vw",
        margin: "auto",
        color: primary.main,
        // backgroundColor: primary.main,
      },
    },
    paper: {
      backgroundColor: secondary.main,
      color: primary.main,
      height: "100%",
    },
    groupLabel: {
      textTransform: "uppercase",
      textAlign: "center",
      backgroundColor: secondary.main,
      color: "#777",
      margin: "10px auto",
      width: "80%",
      letterSpacing: 2,
      padding: 0,
      lineHeight: "normal",
    },
    noOptions: {
      backgroundColor: secondary.main,
      color: primary.main,
    },
    focused: {
      outline: `3px solid ${secondary.main}`,
      borderRadius: "0px",
    },
    searchTextField: {
      backgroundColor: primary.main,
      borderRadius: "none",
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

  // const customPopper = function (props) {
  //   return (
  //     <Popper {...props} className={classes.popper} placement="bottom-start" />
  //   );
  // };

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
          focused: classes.focused,
        }}
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
            className={classes.searchTextField}
          ></TextField>
        )}
      ></Autocomplete>
    </div>
  );
}
