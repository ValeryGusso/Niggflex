import classNames from 'classnames'
import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authSelector, setUser } from '../../Redux/Slices/auth'
import pin from '../../Assets/img/pin.svg'
import cls from './Buttons.module.css'
import axiosUserAPI from '../../axios/userAPI'
import { UpdatedResponse } from '../../Interfaces/UserAPI/userAPIResponses'
import { useDispatch } from 'react-redux'
import { HandySvg } from 'handy-svg'
import heart from '../../Assets/img/heart.svg'
import Loader from '../Loader/Loader'

interface FavoriteProps {
	id: number
	type: 'button' | 'icon'
}

const Favorite: FC<FavoriteProps> = ({ id, type }) => {
	const dispatch = useDispatch()
	const { favorite, isAuth, sex } = useSelector(authSelector)
	const [isFavorite, setIsFavorite] = useState(false)
	const [loading, setLoading] = useState(false)

	async function setFavorite() {
		setLoading(true)
		if (!isFavorite) {
			const res = await axiosUserAPI.patch<UpdatedResponse>('/favorite', { id }).finally(() => {
				setLoading(false)
			})
			if (res.status === 200) {
				dispatch(setUser(res.data.user))
			}
		} else {
			const res = await axiosUserAPI.delete<UpdatedResponse>('/favorite', { data: { id } }).finally(() => {
				setLoading(false)
			})
			if (res.status === 200) {
				dispatch(setUser(res.data.user))
			}
		}
	}

	useEffect(() => {
		favorite.includes(id) ? setIsFavorite(true) : setIsFavorite(false)
	}, [favorite])

	return (
		<>
			{type === 'button' ? (
				<div className={classNames(cls.favorite, isFavorite ? cls.selectedF : '')}>
					<img className={isFavorite ? cls.pin : ''} src={pin} alt="pin" />
					<p onClick={setFavorite}>{isFavorite ? 'Убрать' : 'Добавить в избранное'}</p>
				</div>
			) : (
				<div onClick={setFavorite} className={cls.heart}>
					{loading ? (
						<div className={cls.loader}>
							<Loader />
						</div>
					) : (
						<div className={cls.loader}>
							<HandySvg src={heart} fill={isFavorite ? 'red' : '#dfdfdf'} />
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default Favorite
