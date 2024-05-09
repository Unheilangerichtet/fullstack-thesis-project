import axios from "axios";

//give back a connector, function that returns a connector
// This Api can be used to hit our different endpoints
export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`,
  });
};
