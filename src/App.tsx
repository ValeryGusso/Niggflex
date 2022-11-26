import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { User } from './Interfaces/UserAPI/userAPIResponses'
import axiosUserAPI from './axios/userAPI'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Loader from './Components/Loader/Loader'
import NiggflexRouter from './Components/Router'
import { setUser } from './Redux/Slices/auth'

const App: FC = () => {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const access = localStorage.getItem('access')

		if (access) {
			axiosUserAPI
				.get<User>('/me')
				.then(res => {
					if (res?.data) {
						dispatch(setUser(res.data))
					}
				})
				.finally(() => {
					setLoading(false)
				})
		} else {
			setLoading(false)
		}
	}, [])

	return (
		<div className="container">
			{!loading ? (
				<>
					<Header />
					<div className="content">
						<NiggflexRouter />
					</div>
					<footer>
						<Footer />
					</footer>
				</>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default App
