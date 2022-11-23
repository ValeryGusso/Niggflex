import { FC } from 'react'
import { Link } from 'react-router-dom'
import unauthorized from '../../Assets/img/unauthorized.png'
import cls from './Unauthorized.module.css'

const Unauthorized: FC = () => {
	return (
		<div className={cls.container}>
			<div className={cls.wrapper}>
				<h1>
					Данная страница доступна только для <Link to="/login">авторизованных</Link> пользователей
				</h1>
				<img src={unauthorized} alt="unauthirized" />
			</div>
		</div>
	)
}

export default Unauthorized
