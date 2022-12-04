import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosUserAPI: AxiosInstance = axios.create({
	withCredentials: false, // was true
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:666',
})

axiosUserAPI.interceptors.request.use((config: AxiosRequestConfig) => {
	if (config?.headers) {
		config.headers['authorization'] = `Bearer ${localStorage.getItem('access') || ''}`
		config.headers['Access-Control-Allow-Origin'] = '*'
		// config.headers['Access-Control-Allow-Origin'] = process.env.REACT_APP_API_URL || 'http://localhost:666'
		// config.headers['Content-Type'] = config.url === '/image' ? 'multipart/form-data' : 'application/json'
		// config.headers['Access-Control-Allow-Credentials'] = 'include'
		// config.headers['Vary'] = 'Origin'
	}
	return config
})

axiosUserAPI.interceptors.response.use(
	(config: AxiosResponse) => {
		return config
	},
	async err => {
		const originalRequest = err?.config
		if (err && +err.response?.status === 401 && !originalRequest?.isRetry) {
			try {
				originalRequest.isRetry = true
				const res = await axios.get('/refresh', {
					withCredentials: true,
					baseURL: process.env.REACT_APP_API_URL || 'http://localhost:666',
					headers: {
						'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL || 'http://localhost:666',
						'Access-Control-Allow-Credentials': 'include',
					},
				})
				localStorage.setItem('access', res.data.access)

				if (originalRequest.data) {
					originalRequest.data = JSON.parse(originalRequest.data)
				}

				originalRequest.headers = { ...originalRequest.headers }

				return axiosUserAPI.request(originalRequest)
			} catch (err) {
				console.log(err)
			}
		}

		return Promise.reject(err)
	}
)

export default axiosUserAPI
