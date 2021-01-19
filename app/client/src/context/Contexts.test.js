import React from "react";
import { API } from "../util/fetch";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { render } from "../custom-render";
import Home from "../pages/Home/Home";

jest.mock("axios");

