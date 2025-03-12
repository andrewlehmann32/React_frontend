import axios from 'axios';
import { store } from '../redux/store';

const setAuthHeader = () => {
    const state = store.getState();

    const token = (state.userSlice.impersonationToken ?? localStorage.getItem('impersonationToken')) || localStorage.getItem('token');
    if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
};
setAuthHeader();

export default axios;
