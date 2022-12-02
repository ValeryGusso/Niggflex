import { FC } from 'react'
import { Link } from 'react-router-dom'
import unauthorized from '../../Assets/img/unauthorized.png'
import cls from './Buttons.module.css'

interface ErrorProps {
	setError: React.Dispatch<React.SetStateAction<ErrorState>>
}

export interface ErrorState {
	x: number
	y: number
	show: boolean
}

const Error: FC<ErrorProps> = ({ setError }) => {
	return (
		<div className={cls.errorWrapper} onMouseLeave={() => setError(prev => ({ ...prev, show: false }))}>
			<img src={unauthorized} alt="no access" />
			<h1>
				Данное действие доступно только для <Link to="/login">авторизованных</Link> пользователей
			</h1>
		</div>
	)
}

export default Error
