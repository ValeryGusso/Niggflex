import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../Components/Input/Input'
import cls from './Login.module.css'

const passwordErrors = ['Пароли не совпадают!', 'Пароль не может быть короче 5 символов!', 'Введите пароль!']

const Login: FC = () => {
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const [error, setError] = useState(false)

	function submit() {
		console.log(login, pass)
	}

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
							error={error}
							errorText={passwordErrors[2]}
							placeholder="Тут логин"
						/>
					</div>
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
