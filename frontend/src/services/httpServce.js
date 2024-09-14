import axios from "axios";
import { jwtDecode } from "jwt-decode";




const BASE_URL = import.meta.env.VITE_BASE_URL;

export const httpService = axios.create({
    baseURL: BASE_URL,
});

export const httpInterceptedService = axios.create(
    { baseURL: BASE_URL }
)

httpInterceptedService.interceptors.request.use(
    async (config) => {
        const userData = JSON.parse(localStorage.getItem('chat-user'));
        const token = userData?.token;


        if (token) {
            const decode = jwtDecode(token);
            const currentTime = new Date();
            if (currentTime.getTime() > decode.exp * 1000) {
                localStorage.removeItem('chat-user');
                window.location.href = '/login';
                return null;
            }
            config.headers = {
                authorization: `Bearer ${token}`
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
)

httpInterceptedService.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    }
)
