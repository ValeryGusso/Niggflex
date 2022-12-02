import classNames from 'classnames'
import { FC, useState, useEffect, CSSProperties } from 'react'
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
import Error, { ErrorState } from './Error'

interface FavoriteProps {
	id: number
	type: 'button' | 'icon'
}

const Favorite: FC<FavoriteProps> = ({ id, type }) => {
	const dispatch = useDispatch()
	const { favorite, isAuth } = useSelector(authSelector)
	const [isFavorite, setIsFavorite] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState({ x: 0, y: 0, show: false } as ErrorState)

	async function setFavorite(e: React.MouseEvent<HTMLParagraphElement | HTMLDivElement, MouseEvent>) {
		if (!isAuth) {
			setError({ x: e.clientX, y: e.clientY, show: true })
			return
		}

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
					<p onClick={e => setFavorite(e)}>{isFavorite ? 'Убрать' : 'Добавить в избранное'}</p>
					{error.show && (
						<div style={{ '--x': `${error.x}px`, '--y': `${error.y}px` } as CSSProperties} className={cls.error}>
							<Error setError={setError} />
						</div>
					)}
				</div>
			) : (
				<div className={cls.heart}>
					{loading ? (
						<div className={cls.loader}>
							<Loader />
						</div>
					) : (
						<div onClick={e => setFavorite(e)} className={cls.loader}>
							<HandySvg src={heart} fill={isFavorite ? 'red' : '#dfdfdf'} />
						</div>
					)}
					{error.show && (
						<div style={{ '--x': `${error.x}px`, '--y': `${error.y}px` } as CSSProperties} className={cls.error}>
							<Error setError={setError} />
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default Favorite
