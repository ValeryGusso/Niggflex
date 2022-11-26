import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const axiosKPofficial: AxiosInstance = axios.create({
	params: {
		token: '4KCTKW4-FNN45QN-NZFVTWV-XW8D358',
	},
})

// axiosKPofficial.interceptors.request.use((config: AxiosRequestConfig) => {
// 	console.log('CONFIG:', config.url)
// 	return config
// })

export default axiosKPofficial
