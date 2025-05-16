import axios from 'axios';
const BASE_URL = 'https://www.foodmart-api.dipikaepili.in';

export default axios.create({
    baseURL: BASE_URL
});//currently only used in register component 

export { BASE_URL };