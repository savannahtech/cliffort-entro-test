import axios from 'axios';

export const API = axios.create({
	baseURL: 'http://localhost:4444',
	headers: {
		Accept: '*/*',
		'Content-Type': 'application/json',
	},
});
