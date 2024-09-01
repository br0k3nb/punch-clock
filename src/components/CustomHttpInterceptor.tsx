import axios from 'axios';
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth';

const { VITE_VERCEL_ENV, VITE_VERCEL_API_URL, VITE_VERCEL_DEV_API_URL } = import.meta.env; //vite env variables

const baseURL =
  VITE_VERCEL_ENV === "DEV" ? VITE_VERCEL_DEV_API_URL : VITE_VERCEL_API_URL;

const api = axios.create({ baseURL });

const AxiosInterceptor = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(config => {
            const token = localStorage.getItem("@PUNCH-CLOCK:SYSTEM") || "{}";
            if (token) config.headers.Authorization = `Bearer ${token}`;
        
            return config;
        });
        
        const responseInterceptor = api.interceptors.response.use(
            response => response,
            error => {
                const errorStatus = error?.response?.status;
                const errorMessage = error?.response?.data?.message as string

                if ((errorStatus >= 500 && errorStatus <= 599)){
                    //(500 - 599) = Server error responses
                    return Promise.reject({ message: "Server error, please try again or later" });
                } 
        
                if(error?.code === "ERR_NETWORK") {
                    return Promise.reject({ message: "Connection to server failed, please verify your internet connection" });
                }

                if((typeof errorMessage === "string" && error.code !== "ECONNABORTED") && 
                    (errorMessage.startsWith("Authentication") ||
                    errorMessage.startsWith("Access") ||
                    errorMessage.startsWith("Session"))
                ) {
                    auth.signOut();
                }

                return Promise.reject(error?.response?.data);
            },
        );

        return () => (
            api.interceptors.request.eject(requestInterceptor),
            api.interceptors.response.eject(responseInterceptor)
        )

    }, [])

    return children;
}


export default api;
export { AxiosInterceptor }
