import { FC, useState, useEffect, CSSProperties } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movieType } from '../../Assets/constants'
import { UpdatedResponse } from '../../Interfaces/UserAPI/userAPIResponses'
import axiosUserAPI from '../../axios/userAPI'
import { authSelector, setUser } from '../../Redux/Slices/auth'
import viewedIMG from '../../Assets/img/viewed.svg'
import unviewedIMG from '../../Assets/img/unviewed.svg'
import cls from './Buttons.module.css'
import { HandySvg } from 'handy-svg'
import Loader from '../Loader/Loader'
import Error, { ErrorState } from './Error'

interface VievedProps {
	id: number
	type: string
}

const Viewed: FC<VievedProps> = ({ id, type }) => {
	const dispatch = useDispatch()
	const { viewed, isAuth, sex } = useSelector(authSelector)
	const [isViewed, setIsViewed] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState({ x: 0, y: 0, show: false } as ErrorState)

	async function setViewed(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
		if (!isAuth) {
			setError({ x: e.clientX, y: e.clientY, show: true })
			return
		}

		!loading && setLoading(true)
		if (!isViewed) {
			const res = await axiosUserAPI.patch<UpdatedResponse>('/viewed', { id }).finally(() => {
				setLoading(false)
			})
			if (res.status === 200) {
				dispatch(setUser(res.data.user))
			}
		} else {
			const res = await axiosUserAPI.delete<UpdatedResponse>('/viewed', { data: { id } }).finally(() => {
				setLoading(false)
			})
			if (res.status === 200) {
				dispatch(setUser(res.data.user))
			}
		}
	}

	function printType(type: string): string {
		switch (type) {
			case movieType[0].value:
				return 'т ' + movieType[0].title
			case movieType[1].value:
				return 'о ' + movieType[1].title
			case movieType[2].value:
				return 'т ' + movieType[2].title
			case movieType[3].value:
				return 'т ' + movieType[3].title
			default:
				return ''
		}
	}

	useEffect(() => {
		viewed.includes(id) ? setIsViewed(true) : setIsViewed(false)
	}, [viewed])

	return (
		<>
			<div className={cls.viewed}>
				<p>
					Это{printType(type)} я <br />
					{isViewed ? 'уже смотрел' + (sex === 'woman' ? 'a' : '') : 'ещё не видел' + (sex === 'woman' ? 'a' : '')}
				</p>
				<div onClick={e => setViewed(e)}>
					{loading ? (
						<Loader />
					) : (
						<HandySvg src={isViewed ? viewedIMG : unviewedIMG} fill={isViewed ? '#5cff6a' : '#dfdfdf'} />
					)}
				</div>
			</div>
			{error.show && (
				<div style={{ '--x': `${error.x - 225}px`, '--y': `${error.y}px` } as CSSProperties} className={cls.error}>
					<Error setError={setError} />
				</div>
			)}
		</>
	)
}

export default Viewed
