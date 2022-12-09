import { FC, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { genders } from '../../Assets/constants'
import { authSelector, setUser } from '../../Redux/Slices/auth'
import maleSign from '../../Assets/img/sign_m.svg'
import womanSign from '../../Assets/img/sign_w.svg'
import helicopterSign from '../../Assets/img/sign_h.svg'
import cls from './Settings.module.css'
import axiosUserAPI from '../../axios/userAPI'
import { useDispatch } from 'react-redux'
import { MeResponse } from '../../Interfaces/UserAPI/userAPIResponses'
import Compressor from 'compressorjs'
import { randomName } from '../../Utils/randomName'
import Input from '../../Components/Input/Input'
import { ErrorState } from '../Registration/Registration'
import { HandySvg } from 'handy-svg'
import uploadImage from '../../Assets/img/upload.svg'
import close from '../../Assets/img/close.svg'
import { TypeDispatch } from '../../Redux/store'
import Loader from '../../Components/Loader/Loader'

const Settings: FC = () => {
	const dispatch = useDispatch<TypeDispatch>()
	const { name: myName, sex: mySex, avatar: myAvatar } = useSelector(authSelector)
	const [name, setName] = useState(myName)
	const [sex, setSex] = useState(mySex)
	const [avatar, setAvatar] = useState(myAvatar)
	const [showList, setShowList] = useState(false)
	const [wasChanged, setWasChanged] = useState(false)
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [error, setError] = useState<ErrorState>({} as ErrorState)
	const [image, setImage] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const timestamps = useRef({ data: 0, image: 0 })

	function printGender(sex: string): string {
		switch (sex) {
			case genders[0]:
				return 'мужчина'
			case genders[1]:
				return 'женщина'
			case genders[2]:
				return 'боевой вертолёт Апачи'
			default:
				return ''
		}
	}

	function setSign(sex: string): string {
		switch (sex) {
			case genders[0]:
				return maleSign
			case genders[1]:
				return womanSign
			case genders[2]:
				return helicopterSign
			default:
				return ''
		}
	}

	function changeSex(sex: string): void {
		setSex(sex)
		setShowList(false)
		if (!wasChanged) {
			setWasChanged(true)
		}
	}

	function changeName(e: React.ChangeEvent<HTMLInputElement>): void {
		setName(e.target.value)
		if (!wasChanged) {
			setWasChanged(true)
		}
	}

	function changeAvatar(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setAvatar(e.target.value)
		if (!wasChanged) {
			setWasChanged(true)
		}
	}

	useEffect(() => {
		if (error.error) {
			setError({} as ErrorState)
		}
		if (!wasChanged && (password || confirm)) {
			setWasChanged(true)
		}
	}, [password, confirm])

	async function submit() {
		if (password !== confirm) {
			setError({ error: true, message: 'Пароли должны совпадать' })
			return
		}
		setLoading(true)

		const result = await Promise.all([sendData(), sendImage()]).finally(() => {
			setLoading(false)
		})

		if (timestamps.current.data > timestamps.current.image) {
			result[0] && dispatch(setUser(result[0]))
		} else {
			result[1] && dispatch(setUser(result[1]))
		}
	}

	function sendData() {
		return new Promise<MeResponse>((resolve, reject) => {
			const data = { name, sex, avatar, password, confirm }
			axiosUserAPI
				.patch<MeResponse>('/update', { ...data })
				.then(res => {
					resolve(res.data)
					timestamps.current.data = Date.now()
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	function sendImage() {
		if (image) {
			return new Promise<MeResponse>((resolve, reject) => {
				new Compressor(image, {
					maxWidth: 150,
					maxHeight: 150,
					success(result: File) {
						const formData = new FormData()
						const extansion = result.name.match(/\.\w+/gi)
						formData.append('image', result, randomName(15) + extansion![0])
						axiosUserAPI
							.post<MeResponse>('/image', formData)
							.then(res => {
								resolve(res.data)
								timestamps.current.image = Date.now()
							})
							.catch(err => {
								reject(err)
							})
					},
				})
			})
		}
	}

	function upload(e: React.ChangeEvent<HTMLInputElement>): void {
		if (e.target.files) {
			setImage(e.target.files[0])
			if (!wasChanged) {
				setWasChanged(true)
			}
		}
	}

	function redirect(): void {
		inputRef.current?.click()
	}

	return (
		<div onClick={() => showList && setShowList(false)} className={cls.container}>
			<div className={cls.block}>
				<p>Имя:</p>
				<input className={cls.name} value={name} onChange={changeName} tabIndex={1} />
			</div>
			<div className={cls.block}>
				<p>Пол:</p>
				<p onClick={() => setShowList(true)}>{printGender(sex)}</p>
				<div className={cls.menu}>
					{showList &&
						genders.map(
							el =>
								el !== sex && (
									<li key={el} onClick={() => changeSex(el)}>
										<img src={setSign(el)} alt="sign" />
										<p>я - {printGender(el)}</p>
									</li>
								)
						)}
				</div>
			</div>
			<div className={cls.avatarBlock}>
				<p>Аватар:</p>
				<textarea className={cls.avatar} value={avatar} onChange={changeAvatar} placeholder="Ссылка на картинку" />
				<div>
					<p>Или загрузи свой файл:</p>
					<div>
						{/* @ts-ignore */}
						<HandySvg onClick={redirect} src={uploadImage} fill="#dfdfdf" />
						{image && <img onClick={() => setImage(null)} className={cls.close} src={close} alt="close" />}
						<p>{image?.name}</p>
					</div>
				</div>
			</div>
			<div className={cls.password}>
				<h1>Сменить пароль:</h1>
				<Input
					type="password"
					error={error.error}
					errorText={error.message}
					placeholder="Новый пароль"
					value={password}
					onChange={setPassword}
					tabIndex={2}
				/>
				<Input
					type="password"
					error={error.error}
					errorText={error.message}
					placeholder="И ещё раз"
					value={confirm}
					onChange={setConfirm}
					tabIndex={3}
				/>
				{wasChanged && (
					<div className={cls.btn}>
						{loading ? (
							<Loader />
						) : (
							<button onClick={submit} tabIndex={4}>
								Сохранить изменения!
							</button>
						)}
					</div>
				)}
			</div>
			<input ref={inputRef} onChange={e => upload(e)} type="file" hidden={true} />
		</div>
	)
}

export default Settings
