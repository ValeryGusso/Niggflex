import { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movieType } from '../../Assets/constants'
import { UpdatedResponse } from '../../Interfaces/UserAPI/userAPIResponses'
import axiosUserAPI from '../../axios/userAPI'
import { authSelector, setUser } from '../../Redux/Slices/auth'
import cls from './Buttons.module.css'

interface VievedProps {
	id: number
	type: string
}

const Viewed: FC<VievedProps> = ({ id, type }) => {
	const dispatch = useDispatch()
	const { viewed, isAuth, sex } = useSelector(authSelector)
	const [isViewed, setIsViewed] = useState(true)

	async function setViewed() {
		if (!isViewed) {
			const res = await axiosUserAPI.patch<UpdatedResponse>('/viewed', { id })
			if (res.status === 200) {
				dispatch(setUser(res.data.user))
			}
		} else {
			const res = await axiosUserAPI.delete<UpdatedResponse>('/viewed', { data: { id } })
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
		<div className={cls.viewed}>
			<p>Это{printType(type)} я</p>
			<p onClick={setViewed} className={isViewed ? cls.selectedV : ''}>
				{isViewed ? 'уже смотрел' + (sex === 'woman' ? 'a' : '') : 'ещё не видел' + (sex === 'woman' ? 'a' : '')}
			</p>
		</div>
	)
}

export default Viewed
