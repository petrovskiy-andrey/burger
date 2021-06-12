import axios from 'axios';

const instance = axios.create({
  baseURL: `https://burgerapp-e7647-default-rtdb.europe-west1.firebasedatabase.app/`,
});

export default instance;
