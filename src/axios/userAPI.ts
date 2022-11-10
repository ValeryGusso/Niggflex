import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosUserAPI: AxiosInstance = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:666',
	headers: {
		credentials: 'include',
		'Access-Control-Allow-Origin': '*',
	},
})

axiosUserAPI.interceptors.request.use((config: AxiosRequestConfig) => {
	if (config.headers) {
		config.headers.Authorization = `Bearer ${localStorage.getItem('access') || ''}`
	}
	return config
})

axiosUserAPI.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	async err => {
		try {
			if (+err.response.status === 401 && !err.config.isRetry) {
				const originalRequest = err.config
				// console.log(originalRequest)
				originalRequest.isRetry = true
				const res = await axios.get('http://localhost:666/refresh', {
					withCredentials: true,
					baseURL: 'http://localhost:666',
					headers: {
						credentials: 'include',
						'Access-Control-Allow-Origin': '*',
					},
				})
				localStorage.setItem('access', res.data.access)
				return axiosUserAPI.request(originalRequest)
			}
		} catch (err) {
			console.log(err)
		}
	}
)

export default axiosUserAPI
