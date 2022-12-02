import axios, { AxiosInstance } from 'axios'

const axiosKPunofficial: AxiosInstance = axios.create({
	baseURL: 'https://kinopoiskapiunofficial.tech/api/',
	headers: {
		'X-API-KEY': process.env.REACT_APP_TOKEN_KP_UNOFF,
	},
})

export default axiosKPunofficial
