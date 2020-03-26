import axios from 'axios';
import { BOT_TOKEN, TEAMS_API_URL } from '../constants';

const axiosInstance = axios.create({
	baseURL: TEAMS_API_URL,
	timeout: 5000,
	headers: { 'authorization': `Bearer ${BOT_TOKEN}` }
});


export default axiosInstance;