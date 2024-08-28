import axios from 'axios'

// const baseURL = "http://localhost:8080/";


//to validate the user
export const validate = (data)=>{
   return axios.post("http://localhost:8080/user/validate", data);
}

//to check email or excits in db while registering.
export const isEmailOrPhoneExcists = (data)=>{
    return axios.post("http://localhost:8080/user/isExcists", data)
}

//to register user
export const registerUser = (data)=>{
    axios.post("http://localhost:8080/user/insert", data);
}

//to get food items
export const getFoodItems = (type)=>{
    return axios.get(`http://localhost:8080/food/${type}`);
}

//to insert orders
export const insertOrders = (data)=>{
    return axios.post('http://localhost:8080/orders/insertAll',data);
}
