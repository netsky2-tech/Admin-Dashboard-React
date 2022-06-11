import axios from "axios";

const axiosCliente = axios.create();

//axiosCliente.defaults.baseURL = 'https://localhost:44345/';
axiosCliente.defaults.baseURL = 'http://omorales2-001-site1.itempurl.com/';

axiosCliente.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    withCredentials: true
};

axiosCliente.defaults.timeout = 3000;


export default axiosCliente;