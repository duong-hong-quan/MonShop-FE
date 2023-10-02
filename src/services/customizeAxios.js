import axios from 'axios';
import hosting from '../Utils/config';
import { refreshAccessToken } from './userService';

const instance = axios.create({
    baseURL: hosting
});

let isRefreshing = false;
let refreshSubscribers = [];

// Tạo một hàm để gửi lại yêu cầu sau khi refreshToken thành công
function onRefreshed(token) {
    refreshSubscribers.forEach(callback => callback(token));
    refreshSubscribers = [];
}

// Thêm interceptor request
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Thêm interceptor response
instance.interceptors.response.use(response => {
    // Xử lý phản hồi ở đây nếu cần
    return response.data ? response.data : { statusCode: response.status };
}, async error => {
    let res = {};
    if (error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;

        if (res.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                // Gọi API refreshToken ở đây để lấy token mới
                try {
                    const newToken = await refreshAccessToken(); // Thay callRefreshToken bằng hàm gọi API refreshToken thực tế
                    onRefreshed(newToken.data.token);
                    isRefreshing = false;
                } catch (refreshError) {
                    console.error('Lỗi khi gọi refreshToken:', refreshError);
                    // Đăng xuất hoặc xử lý lỗi khác tùy theo trường hợp
                }
            }
            // Tạo một Promise để chờ lấy token mới và gửi lại yêu cầu ban đầu
            const retryOriginalRequest = new Promise(resolve => {
                refreshSubscribers.push(token => {
                    error.config.headers['Authorization'] = `Bearer ${token}`;
                    resolve(instance(error.config));
                });
            });
            return retryOriginalRequest;
        }
    } else {
        console.error(error.message);
    }
    return res;
});

export default instance;
