import axios from 'axios';

const instance = axios.create({
    baseURL: `https://api.invoicer.dev`,
});

export default instance;
