import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../Components/Input/Input'
import cls from './Registration.module.css'

const passwordErrors = ['Пароли не совпадают!', 'Пароль не может быть короче 5 символов!', 'Введите пароль!']

const Registration: FC = () => {
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const [confirm, setConfirm] = useState('')
	const [error, setError] = useState(false)

	function submit() {
		console.log(login, pass)
	}

	return (
		<div className={cls.container}>
			<div>
				<div className={cls.content}>
					<h1>REGISTRATION</h1>
					<div className={cls.wrapper}>
						<div>
							<div className={cls.block}>
								<h2>Имя пользователя:</h2>
								<Input
									value={login}
									onChange={setLogin}
									type="text"
									error={error}
									errorText={passwordErrors[2]}
									placeholder="Тут почта"
								/>
							</div>
							<button onClick={submit}>Войти</button>
						</div>
						<div>
							<div className={cls.block}>
								<h2>Пароль:</h2>
								<Input
									value={pass}
									onChange={setPass}
									type="password"
									error={error}
									errorText={passwordErrors[2]}
									placeholder="А вот тут пароль"
								/>
							</div>
							<div className={cls.block}>
								<h2>Подтверди пароль:</h2>
								<Input
									value={confirm}
									onChange={setConfirm}
									type="password"
									error={error}
									errorText={passwordErrors[2]}
									placeholder="И ещё раз пароль"
								/>
							</div>
						</div>
					</div>
					<div className={cls.footer}>
						<p>Уже есть аккаунт?</p>
						<Link to={'/login'}>Так чего же ты ждешь? Заходи!</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Registration
