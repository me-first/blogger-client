import axios from "axios";
const url = "https://bloggerserver.herokuapp.com/";
const instance = axios.create({
  baseURL: url,
});

export default instance;
