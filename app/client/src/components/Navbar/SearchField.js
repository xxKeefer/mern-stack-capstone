import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { API } from "../../util/fetch";
import { useGlobal } from "../../context/GlobalState";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { primary, secondary },
  } = theme;
  return {
    root: {
      height: "1.5rem",
      width: "25vw",
      [breakpoints.down("sm")]: {
        width: "70vw",
        margin: "auto",
        color: primary.main,
      },
    },
    paper: {
      backgroundColor: secondary.main,
      color: primary.main,
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
      outline: `1px solid ${secondary.main}`,
    },
  };
});

export default function SearchField() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const globe = useGlobal();

  const { searchQuery, setSearchQuery } = globe;

  useEffect(() => {
    const getRecords = async () => {
      try {
        const { data } = await API.get("/records/search");
        setRecords(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecords();
  }, []);

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
        freeSolo={true}
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
        ListboxProps={{
          style: { height: "15rem", border: "solid 2px white", margin: "0px" },
        }}
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
            className={classes.searchTextField}
          ></TextField>
        )}
      ></Autocomplete>
    </div>
  );
}
