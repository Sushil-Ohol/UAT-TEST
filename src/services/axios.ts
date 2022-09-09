/* eslint-disable no-param-reassign */
/* This file helps to interact with server with interceptors */
import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json"
  }
});
