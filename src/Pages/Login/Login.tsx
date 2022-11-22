import { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ActivateResponse } from '../../axios/types'
import axiosUserAPI from '../../axios/userAPI'
import Input from '../../Components/Input/Input'
import { setUser } from '../../Redux/Slices/auth'
import { ErrorState } from '../Registration/Registration'
import cls from './Login.module.css'

const Login: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const [loginError, setLoginError] = useState({} as ErrorState)
	const [passError, setPassError] = useState({} as ErrorState)

	async function submit() {
		if (!login || !pass) {
			!login && setLoginError({ error: true, message: 'Тут ничего нет :( а зря...' })
			!pass && setPassError({ error: true, message: 'Тут ничего нет :( а зря...' })
			return
		}

		const request = { email: login, password: pass }
		const res = await axiosUserAPI.post<ActivateResponse>('/login', request)

		if (res?.data?.access) {
			localStorage.setItem('access', res.data.access)
			dispatch(setUser(res.data.user))
			navigate('/')
		} else {
			setLoginError({ error: true, message: 'Неверное имя пользователя или пароль' })
			setPassError({ error: true, message: 'Неверное имя пользователя или пароль' })
		}
	}

	useEffect(() => {
		setLoginError({} as ErrorState)
		setPassError({} as ErrorState)
	}, [login, pass])

	return (
		<div className={cls.container}>
			<div>
				<div className={cls.content}>
					<h1>LOGIN</h1>
					<div className={cls.block}>
						<h2>Имя пользователя:</h2>
						<Input
							value={login}
							onChange={setLogin}
							type="text"
							error={loginError.error}
							errorText={loginError.message}
							placeholder="Тут логин"
						/>
					</div>
					<div className={cls.block}>
						<h2>Пароль:</h2>
						<Input
							value={pass}
							onChange={setPass}
							type="password"
							error={passError.error}
							errorText={passError.message}
							placeholder="А вот тут пароль"
						/>
					</div>
					<div className={cls.footer}>
						<p>Нет аккаунта?</p>
						<Link to={'/registration'}>Зарегистрируйся сейчас!</Link>
					</div>
					<button onClick={submit}>Войти</button>
				</div>
			</div>
		</div>
	)
}

export default Login
