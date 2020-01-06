import axios from "axios";
import store from "@/store";

const backendUrl: string = "https://konishi-zimmerman.herokuapp.com";

const ApiService = {
  init(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  },

  setHeader() {
    axios.defaults.headers.common.Authorization = `Bearer ${store.getters["auth/accessToken"]}`;
  },

  removeHeader() {
    axios.defaults.headers.common = [];
  },

  get(resource: string) {
    return axios.get(resource);
  },

  post(resource: string, data: any) {
    return axios.post(resource, data);
  },

  put(resource: string, data: any) {
    return axios.put(resource, data);
  },

  delete(resource: string) {
    return axios.delete(resource);
  },

  /*
    Perform custom Axios request.
    data is an object
    - method
    - url
    - data ... request payload
    - auth (optional)
      - email
      - password
  */

  customRequest(data: any) {
    return axios(data);
  }
};

export default ApiService;

export { ApiService, backendUrl };
