import axios from 'axios';
const Axios = axios.create({
  baseURL: 'http://localhost:3003/api',
});
export default Axios;