import axios from 'axios';
import { JIRA_API_URL } from '../constants';

const axiosInstance = axios.create({
	baseURL: JIRA_API_URL,
	timeout: 5000,
	headers: {
		"Content-Type": " application/json", "Authorization": "Basic YWtvdXNoa2U6UmV6YWtqb29uYW0hMQ=="
	},
});


export default axiosInstance;