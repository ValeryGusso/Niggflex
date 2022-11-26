import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Actor from '../Pages/Actor/Actor'
import Anime from '../Pages/Anime/Anime'
import Cartoon from '../Pages/Cartoon/Cartoon'
import Favorite from '../Pages/Favorite/Favorite'
import Film from '../Pages/Film/Film'
import Films from '../Pages/Films/FIlms'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Premieres from '../Pages/Premieres/Premieres'
import Registration from '../Pages/Registration/Registration'
import SearchResults from '../Pages/Search/SearchResults'
import Series from '../Pages/Series/Series'
import Settings from '../Pages/Settings/Settings'
import { authSelector } from '../Redux/Slices/auth'

const NiggflexRouter: FC = () => {
	const { isAuth } = useSelector(authSelector)

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/films" element={<Films />} />
			<Route path="/series" element={<Series />} />
			<Route path="/premieres" element={<Premieres />} />
			<Route path="/cartoon" element={<Cartoon />} />
			<Route path="/favorite" element={<Favorite />} />
			<Route path="/anime" element={<Anime />} />
			<Route path="/search/films" element={<SearchResults type="films" />} />
			<Route path="/search/actors" element={<SearchResults type="actors" />} />
			<Route path="/film/:id" element={<Film />} />
			<Route path="/actor/:id" element={<Actor />} />
			{!isAuth && <Route path="/login" element={<Login />} />}
			{!isAuth && <Route path="/registration" element={<Registration />} />}
			{isAuth && <Route path="/settings" element={<Settings />} />}
			<Route path="*" element={<Home />} />
		</Routes>
	)
}

export default NiggflexRouter
