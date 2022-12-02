import { FC, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../Components/Input/Input'
import axiosUserAPI from '../../axios/userAPI'
import cls from './Registration.module.css'
import Loader from '../../Components/Loader/Loader'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Redux/Slices/auth'
import { ActivateResponse, RegistrationResponse } from '../../Interfaces/UserAPI/userAPIResponses'
import { useForm } from 'react-hook-form'
import DancingText from '../../Components/DancingText/DancingText'

export interface ErrorState {
	error: boolean
	message: string
}

export type ErrorResronse = ErrorItem[]

export interface ErrorItem {
	value: string
	msg: string
	param: string
	location: string
}

const Registration: FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const [confirm, setConfirm] = useState('')
	const [code, setCode] = useState('')
	const [activate, setActivate] = useState(false)
	const [loading, setLoading] = useState(false)
	const [loginError, setLoginError] = useState({} as ErrorState)
	const [passError, setPassError] = useState({} as ErrorState)
	const [activateError, setActivateError] = useState({} as ErrorState)
	const [resended, setResended] = useState(false)
	const [resendedLoading, setResendedLoading] = useState(false)
	const { register, handleSubmit } = useForm()
	const id = useRef('')

	async function submit() {
		if (!login) {
			setLoginError({ error: true, message: 'Тут ничего нет :( а зря...' })
			return
		}

		if (pass === confirm) {
			if (!pass && !confirm) {
				setPassError({ error: true, message: 'Тут ничего нет :( а зря...' })
				return
			}
			setLoading(true)
			const request = { email: login, password: pass }
			const res = await axiosUserAPI
				.post<RegistrationResponse>('/registration', request)
				.catch(err => {
					if (err.response.status === 400 && err.response.data[0]) {
						err.response.data.forEach((err: ErrorItem) => {
							if (err.param === 'password') {
								setPassError({ error: true, message: err.msg })
							}
							if (err.param === 'email') {
								setLoginError({ error: true, message: err.msg })
							}
						})
					}
				})
				.finally(() => setLoading(false))

			if (res && res.status === 200 && res.data.sended) {
				id.current = res.data.id
				setActivate(true)
			} else {
				setLoginError({ error: true, message: 'Некорректный формат почты' })
			}
		} else {
			setPassError({ error: true, message: 'Пароли не совпадают' })
		}
	}

	async function sendCode() {
		if (!code) {
			setActivateError({ error: true, message: 'Тут ничего нет :(' })
			return
		}

		const request = { id: id.current, key: code }
		setLoading(true)
		const res = await axiosUserAPI
			.post<ActivateResponse>('/activate', request)
			.catch(err => {
				if (err) {
					setActivateError({ error: true, message: err.msg })
				}
			})
			.finally(() => {
				setLoading(false)
			})

		if (res) {
			dispatch(setUser(res.data.user))
			localStorage.setItem('access', res.data.access)
			if (res.data.user.isActivated) {
				navigate('/')
			}
		} else {
			setActivateError({ error: true, message: 'Упс, ошибочка вышла! Код активации не подходит...' })
		}
	}

	async function resendMail() {
		setResendedLoading(true)
		const { data } = await axiosUserAPI.post('/resend', { email: login })
		if (data) {
			setResended(true)
			setResendedLoading(false)
		}
	}

	useEffect(() => {
		if (passError.error) {
			setPassError({} as ErrorState)
		}
	}, [pass, confirm])

	useEffect(() => {
		if (loginError.error) {
			setLoginError({} as ErrorState)
		}
	}, [login])

	useEffect(() => {
		setActivateError({} as ErrorState)
	}, [code])

	return (
		<div className={cls.container}>
			<div>
				<div className={cls.content}>
					{activate ? (
						<form onSubmit={handleSubmit(sendCode)} className={cls.activate}>
							<DancingText text="REGISTRATION" />
							<div className={cls.block}>
								<h2>Код активации:</h2>
								<Input
									value={code}
									onChange={setCode}
									type="text"
									error={activateError.error}
									errorText={activateError.message}
									placeholder="Код из письма"
									tabIndex={1}
								/>
								<p className={cls.resend}>
									{resendedLoading ? (
										'идёт отправка...'
									) : resended ? (
										'Письмо повторно отправлено!'
									) : (
										<>
											Не пришёл код активации? <span onClick={resendMail}>Выслать повторно</span>
										</>
									)}
								</p>
							</div>
							<div className={cls.loader}>
								{loading ? <Loader /> : <button tabIndex={2}>Активировать аккаунт!</button>}
							</div>
						</form>
					) : (
						<form onSubmit={handleSubmit(submit)}>
							<div className={cls.title}>
								<DancingText text="REGISTRATION" />
							</div>
							<div className={cls.wrapper}>
								<div>
									<div className={cls.block}>
										<h2>Имя пользователя:</h2>
										<Input
											value={login}
											onChange={setLogin}
											type="text"
											error={loginError.error}
											errorText={loginError.message}
											placeholder="Тут почта"
											tabIndex={1}
											{...register}
										/>
									</div>
									<div className={cls.loader}>{loading ? <Loader /> : <button tabIndex={4}>ПОЕХАЛИ!</button>}</div>
								</div>
								<div>
									<div className={cls.block}>
										<h2>Пароль:</h2>
										<Input
											value={pass}
											onChange={setPass}
											type="password"
											error={passError.error}
											errorText={passError.message}
											placeholder="А вот тут пароль"
											tabIndex={2}
											{...register}
										/>
									</div>
									<div className={cls.block}>
										<h2>Подтверди пароль:</h2>
										<Input
											value={confirm}
											onChange={setConfirm}
											type="password"
											error={passError.error}
											errorText={passError.message}
											placeholder="И ещё раз пароль"
											tabIndex={3}
											{...register}
										/>
									</div>
								</div>
							</div>
							<div className={cls.footer}>
								<p>Уже есть аккаунт?</p>
								<Link to={'/login'}>Так чего же ты ждешь? Заходи!</Link>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}

export default Registration
