import axios from "axios";

export default axios.create({
  baseURL: "https://sheltered-meadow-71757.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});
