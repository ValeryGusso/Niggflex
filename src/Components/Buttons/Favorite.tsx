import classNames from 'classnames'
import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../../Redux/Slices/auth'
import pin from '../../Assets/img/pin.svg'
import cls from './Buttons.module.css'

interface FavoriteProps {
	id: number
}

const Favorite: FC<FavoriteProps> = ({ id }) => {
	const { favorite, isAuth, sex } = useSelector(authSelector)
	const [isFavorite, setIsFavorite] = useState(true)

	async function setFavorite() {
		setIsFavorite(!isFavorite)
	}

	useEffect(() => {
		favorite.includes(id) ? setIsFavorite(true) : setIsFavorite(false)
	}, [favorite])
	return (
		<div className={classNames(cls.favorite, isFavorite ? cls.selectedF : '')}>
			<img className={isFavorite ? cls.pin : ''} src={pin} alt="pin" />
			<p onClick={setFavorite}>{isFavorite ? 'Убрать' : 'Добавить в избранное'}</p>
		</div>
	)
}

export default Favorite
