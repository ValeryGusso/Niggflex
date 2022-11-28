import { CSSProperties, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { User } from './Interfaces/UserAPI/userAPIResponses'
import axiosUserAPI from './axios/userAPI'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Loader from './Components/Loader/Loader'
import NiggflexRouter from './Components/Router'
import mainBG from './Assets/Backgrounds/main_bg.webp'
import seriesBG from './Assets/Backgrounds/series_bg.jpg'
import cartoonBG from './Assets/Backgrounds/cartoon_bg.png'
import animeBG from './Assets/Backgrounds/anime_bg.jpg'
import { setUser, setLoading as setLoadingState } from './Redux/Slices/auth'
import { useLocation } from 'react-router'
import { clearNovelty } from './Redux/Slices/novelty'

const App: FC = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [bg, setBg] = useState(mainBG)

	useEffect(() => {
		const access = localStorage.getItem('access')

		if (access) {
			dispatch(setLoadingState(true))
			axiosUserAPI
				.get<User>('/me')
				.then(res => {
					if (res?.data) {
						dispatch(setUser(res.data))
					}
				})
				.finally(() => {
					setLoading(false)
					dispatch(setLoadingState(false))
				})
		} else {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		dispatch(clearNovelty())
		switch (location.pathname) {
			case '/series':
				setBg(seriesBG)
				break
			case '/cartoon':
				setBg(cartoonBG)
				break
			case '/anime':
				setBg(animeBG)
				break
			default:
				setBg(mainBG)
				break
		}
	}, [location.pathname])

	return (
		<div style={{ '--bg': `URL(${bg})` } as CSSProperties} className="bg">
			<div
				style={
					{ '--backdrop': location.pathname === '/cartoon' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' } as CSSProperties
				}
				className="container"
			>
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
		</div>
	)
}

export default App
