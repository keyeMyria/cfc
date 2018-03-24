import axios from 'axios';

const apiCartola = axios.create({
    baseURL: 'https://api.cartolafc.globo.com',
})

export default apiCartola;