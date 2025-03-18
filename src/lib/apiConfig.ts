import axios from 'axios';

export const setAuthHeader = (token: string) => {
    if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
};

export default axios;
