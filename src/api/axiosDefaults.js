import axios from "axios";


axios.defaults.baseURL = "https://paint-picture-backend-6b0b98f6459e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;