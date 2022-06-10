import axios from "axios";

const axiosCliente = axios.create();

axiosCliente.defaults.baseURL = 'https://localhost:44345/';

axiosCliente.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    withCredentials: true
};

axiosCliente.defaults.timeout = 3000;


export default axiosCliente;