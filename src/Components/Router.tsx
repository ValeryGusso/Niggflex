import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Actor from '../Pages/Actor/Actor'
import Cartoon from '../Pages/Cartoon/Cartoom'
import Favorite from '../Pages/Favorite/Favorite'
import Film from '../Pages/Film/Film'
import Films from '../Pages/Films/FIlms'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Registration from '../Pages/Registration/Registration'
import Series from '../Pages/Series/Series'
import Settings from '../Pages/Settings/Settings'

const NiggflexRouter: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/films" element={<Films />} />
			<Route path="/series" element={<Series />} />
			<Route path="/cartoon" element={<Cartoon />} />
			<Route path="/favorite" element={<Favorite />} />
			<Route path="/film/:id" element={<Film />} />
			<Route path="/actor/:id" element={<Actor />} />
			<Route path="/login" element={<Login />} />
			<Route path="/registration" element={<Registration />} />
			<Route path="/settings" element={<Settings />} />
		</Routes>
	)
}

export default NiggflexRouter
