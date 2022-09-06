import axios from "axios";

export const userSignUp = body =>{
    return  axios.post("/api/1.0/users",body);
}
export const getUsers = (page=0 ,size=3 ) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}
export const login = creds => {
    return axios.post("/api/1.0/auth",{},{auth:creds});
}
export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const setAuthorizotionHeader = ({username, password,isLoggedIn}) => {
    if(isLoggedIn){
        const authorizationHeaderValue = `Basic ${btoa(username +':'+ password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }else{
        delete axios.defaults.headers['Authorization'];
    }
    
} 

