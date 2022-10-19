import axios from "axios";


const request =  axios.create({baseURL: 'http://api.openweathermap.org/data/2.5/'})


export default request