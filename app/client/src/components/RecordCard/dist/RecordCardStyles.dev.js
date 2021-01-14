"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@material-ui/core");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  var _root;

  var _theme$palette = theme.palette,
      fluro = _theme$palette.fluro,
      secondary = _theme$palette.secondary,
      primary = _theme$palette.primary,
      breakpoints = theme.breakpoints;
  return {
    root: (_root = {
      backgroundColor: primary.main,
      width: "90vw"
    }, _defineProperty(_root, breakpoints.up("md"), {
      width: "15vw",
      height: "23vw"
    }), _defineProperty(_root, "maxWidth", "200px"), _defineProperty(_root, "borderRadius", 0), _root),
    artistName: {
      margin: "0px",
      fontSize: "14px"
    },
    recordPrice: {
      fontSize: "14px",
      marginRight: "0.5rem"
    },
    recordTitle: {
      fontSize: "12px"
    },
    labelAndYear: {
      fontSize: "12px",
      color: "#808080"
    },
    cardGenres: {
      textTransform: "uppercase",
      fontSize: "10px"
    },
    coverImage: _defineProperty({
      height: "90vw",
      width: "90vw",
      maxWidth: "200px",
      maxHeight: "200px"
    }, breakpoints.up("md"), {
      height: "15vw",
      width: "15vw",
      filter: "blur(0px)",
      transition: "1s filter"
    }),
    flexedRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0px"
    },
    recordDescription: {
      position: "absolute",
      top: 0,
      left: 0,
      padding: "0.5rem",
      textAlign: "justify",
      cursor: "pointer",
      margin: 0,
      color: secondary.main,
      fontSize: "1rem"
    },
    iconContainer: {
      display: "flex",
      flexDirection: "column"
    },
    cartIcon: {
      fontSize: "1.5rem"
    },
    addIcon: {
      fontSize: "0.5rem",
      color: secondary.main
    },
    preLovedChip: {
      color: secondary.main,
      backgroundColor: fluro.main,
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: "1rem 0.5rem"
    }
  };
});
var _default = useStyles;
exports["default"] = _default;