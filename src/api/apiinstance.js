import axios from "axios";

const api = axios.create({
    baseURL :"https://mycourse-1zbm.onrender.com/api"
});

export default api;