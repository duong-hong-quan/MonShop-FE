import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7022'
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    // Xử lý phản hồi ở đây nếu cần
    return response.data ? response.data : { statusCode: response.status };
}, error => {
    let res ={};
    if(error.response){
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else {
        console.log(error.message);
    }
    return res;
});

export default instance;
