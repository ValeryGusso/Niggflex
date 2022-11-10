import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../../Redux/Slices/auth'
import cls from './Buttons.module.css'

interface VievedProps {
	id: number
	type: string
}

const types = ['movie', 'tv-series', 'animated-series', 'mini-series']

const Viewed: FC<VievedProps> = ({ id, type }) => {
	const { viewed, isAuth, sex } = useSelector(authSelector)
	const [isViewed, setIsViewed] = useState(true)

	async function setViewed() {
		setIsViewed(!isViewed)
	}

	useEffect(() => {
		viewed.includes(id) ? setIsViewed(true) : setIsViewed(false)
	}, [viewed])
	return (
		<div className={cls.viewed}>
			<p>Этот {type === 'movie' ? 'фильм' : 'сериал'} я</p>
			<p onClick={setViewed} className={isViewed ? cls.selectedV : ''}>
				{isViewed ? 'уже смотрел' + (sex === 'woman' ? 'a' : '') : 'ещё не видел' + (sex === 'woman' ? 'a' : '')}
			</p>
		</div>
	)
}

export default Viewed
