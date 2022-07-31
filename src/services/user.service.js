import http from "../http-common";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class UserService {

  userDetail(id) {
    return http.get(API_URL+`/user/detail/${id}`, { headers: authHeader() });
  }

  updateUser(id, name, email, nik, password) {
    return axios.post(API_URL+`/user/update/${id}`, {
      name: name,
      email: email,
      nik: nik,
      password: password
    },
    { 
      headers: authHeader() 
    });
  }
}


export default new UserService();
