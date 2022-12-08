import { FC, useState, useEffect, CSSProperties } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdatedResponse } from '../../Interfaces/UserAPI/userAPIResponses'
import axiosUserAPI from '../../axios/userAPI'
import { authSelector, setUser } from '../../Redux/Slices/auth'
import viewedIMG from '../../Assets/img/viewed.svg'
import unviewedIMG from '../../Assets/img/unviewed.svg'
import cls from './Buttons.module.css'
import { HandySvg } from 'handy-svg'
import Loader from '../Loader/Loader'
import Error, { ErrorState } from './Error'
import { printType } from '../../Utils/print'

interface VievedProps {
	id: number
	type: string
}

const Viewed: FC<VievedProps> = ({ id, type }) => {
	const dispatch = useDispatch()
	const { viewed, isAuth, sex } = useSelector(authSelector)
	const [isViewed, setIsViewed] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<ErrorState>({ x: 0, y: 0, show: false })

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

	useEffect(() => {
		setIsViewed(viewed.includes(id))
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
