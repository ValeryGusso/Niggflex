import { FC, useState } from 'react'
import eye from '../../Assets/img/eye.svg'
import hide from '../../Assets/img/hide.svg'
import cls from './Input.module.css'

interface InputProps {
	type: 'text' | 'password'
	error: boolean
	errorText: string
	placeholder: string
	value: string
	onChange: React.Dispatch<React.SetStateAction<string>>
}

const Input: FC<InputProps> = ({ type, error, errorText, placeholder, onChange, value }) => {
	const [show, setShow] = useState(type !== 'password')

	return (
		<div className={cls.container}>
			{type === 'password' && <img onClick={() => setShow(!show)} src={show ? eye : hide} alt="toggle" />}
			<input
				value={value}
				onChange={e => onChange(e.target.value)}
				className={error ? cls.error : ''}
				type={show ? 'text' : 'password'}
				placeholder={placeholder}
			/>
			{error && <p>{errorText}</p>}
		</div>
	)
}

export default Input
