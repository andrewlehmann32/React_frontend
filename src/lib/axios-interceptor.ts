import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface JwtDecoded {
    exp: number;
    [key: string]: any;
}

interface RotateTokenResponse {
    token: string;
}

export const axiosProtected = axios.create();
export const rotateToken = async (): Promise<RotateTokenResponse> => {
    const { data } = await axios.get<RotateTokenResponse>(`${process.env.REACT_APP_IP}/user/rotateToken`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });
    return data;
};

axiosProtected.interceptors.request.use(
    async (config) => {
        const currentDate = new Date();

        // Check if token exists in localStorage
        const token = localStorage.token;
        if (!token) {
            return Promise.reject('No token found in localStorage');
        }

        const decodedToken: JwtDecoded = jwtDecode(token);

        // Check if the token is expired
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            // Rotate the token if expired
            const data = await rotateToken();
            config.headers['Authorization'] = `Bearer ${data.token}`;
            localStorage.setItem('token', data.token);
        } else {
            // Set existing token if still valid
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
