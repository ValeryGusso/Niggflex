import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { genders } from '../../Assets/constants'
import { authSelector, setUser } from '../../Redux/Slices/auth'
import maleSign from '../../Assets/img/sign_m.svg'
import womanSign from '../../Assets/img/sign_w.svg'
import helicopterSign from '../../Assets/img/sign_h.svg'
import cls from './Settings.module.css'
import axiosUserAPI from '../../axios/userAPI'
import { useDispatch } from 'react-redux'
import { UpdatedResponse } from '../../Interfaces/UserAPI/userAPIResponses'

const Settings: FC = () => {
	const dispatch = useDispatch()
	const { name: myName, sex: mySex, avatar: myAvatar } = useSelector(authSelector)
	const [name, setName] = useState(myName)
	const [sex, setSex] = useState(mySex)
	const [avatar, setAvatar] = useState(myAvatar)
	const [showList, setShowList] = useState(false)
	const [wasChanged, setWasChanged] = useState(false)

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

	useEffect(() => {
		setSex(mySex)
	}, [mySex])

	function changeSex(sex: string): void {
		setSex(sex)
		setShowList(false)
		setWasChanged(true)
	}

	function changeName(e: React.ChangeEvent<HTMLInputElement>) {
		setName(e.target.value)
		setWasChanged(true)
	}

	function changeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
		setAvatar(e.target.value)
		setWasChanged(true)
	}

	async function submit() {
		const data = { name, sex, avatar }
		const res = await axiosUserAPI.patch<UpdatedResponse>('/update', { ...data })
		dispatch(setUser(res.data.user))
	}

	return (
		<div className={cls.container}>
			{/* <div className={cls.wrapper}> */}
			<div className={cls.block}>
				<p>Имя:</p>
				<input className={cls.name} value={name} onChange={changeName} />
			</div>
			<div className={cls.block}>
				<p>Аватар:</p>
				<input className={cls.avatar} value={avatar} onChange={changeAvatar} />
				<p className={cls.banner}>
					На данный момент доступна только возможность использовать ссылку на аватар. Загрузка своих картинок в процессе
					разработки.
				</p>
			</div>
			<div className={cls.block}>
				<p>Пол:</p>
				<p onClick={() => setShowList(true)}>{printGender(sex)}</p>
				<div className={cls.menu} onMouseLeave={() => setShowList(false)}>
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
			{wasChanged && (
				<div className={cls.btn}>
					<button onClick={submit}>Сохранить изменения!</button>
				</div>
			)}
			{/* </div> */}
		</div>
	)
}

export default Settings
