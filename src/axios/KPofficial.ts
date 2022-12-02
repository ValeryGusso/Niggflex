import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const axiosKPofficial: AxiosInstance = axios.create({
	params: {
		token: process.env.REACT_APP_TOKEN_KP_OFF,
	},
})

// axiosKPofficial.interceptors.request.use((config: AxiosRequestConfig) => {
// 	console.log('CONFIG:', config.url)
// 	return config
// })

export default axiosKPofficial
