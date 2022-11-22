import axios, { AxiosInstance } from 'axios'

const axiosKPunofficial: AxiosInstance = axios.create({
	baseURL: 'https://kinopoiskapiunofficial.tech/api/',
	headers: {
		'X-API-KEY': '062b7bcf-9582-4713-bef9-1b0e908cfb6d',
	},
})

export default axiosKPunofficial
