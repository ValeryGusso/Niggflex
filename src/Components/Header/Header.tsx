import { FC, useState, useEffect } from 'react'
import cls from './Header.module.css'
import logo from '../../Assets/img/logo.png'
import cross from '../../Assets/img/cross.svg'
import menu from '../../Assets/img/menu.svg'
import avatarDefaulfMan from '../../Assets/img/avatar_default.jpg'
import avatarDefaulfWoman from '../../Assets/img/avatar_default_woman.jpg'
import avatarDefaulfHelicopter from '../../Assets/img/avatar_default_helicopter.png'
import settings from '../../Assets/img/settings.svg'
import logout from '../../Assets/img/logout.svg'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import classNames from 'classnames'
import axiosUserAPI from '../../axios/userAPI'
import { genders, headerMenu } from '../../Assets/constants'
import { useSelector } from 'react-redux'
import { authSelector, removeUser } from '../../Redux/Slices/auth'
import { useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'

const avatars = [avatarDefaulfMan, avatarDefaulfWoman, avatarDefaulfHelicopter]

const Header: FC = () => {
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const [openSettings, setOpenSettings] = useState(false)
	const { isAuth, name, sex, avatar, loading } = useSelector(authSelector)
	const [defAva, setDefAva] = useState('')

	useEffect(() => {
		genders.forEach((gen, i) => {
			if (gen === sex) {
				setDefAva(avatars[i])
			}
		})
	}, [sex])

	function exit() {
		axiosUserAPI.get('/logout').then(res => {
			if (res.status === 200) dispatch(removeUser())
			localStorage.removeItem('access')
			setOpenSettings(false)
		})
	}

	return (
		<div className={cls.header}>
			<div onMouseLeave={() => setOpen(false)} className={classNames(cls.logo, open ? cls.open : '')}>
				<div>
					<img onClick={() => setOpen(!open)} src={open ? cross : menu} alt="menu" />
					<img src={logo} alt="logo" />
				</div>
				{open && (
					<div className={cls.menu}>
						{headerMenu.map(el => (
							<div key={el.value}>
								<img src={el.img} alt={el.value} />
								<Link to={el.value}>{el.title}</Link>
							</div>
						))}
					</div>
				)}
			</div>
			<div className={cls.search}>
				<Search />
			</div>
			<div className={cls.rightMenu}>
				{loading ? (
					<div className={cls.loader}>
						<h1>Загрузка пользователя...</h1>
						<Loader />
					</div>
				) : (
					<div
						onMouseLeave={() => setOpenSettings(false)}
						className={classNames(cls.topBlock, openSettings ? cls.showSettings : '')}
					>
						{isAuth ? (
							<div onClick={() => setOpenSettings(true)} className={cls.userInfo}>
								<p>{name}</p>
								<img src={avatar || defAva} alt="avatar" />
							</div>
						) : (
							<div className={cls.userInfo}>
								<Link to="/registration">Регистрация</Link>
								<Link to="/login">Вход</Link>
							</div>
						)}
						{openSettings && (
							<div className={cls.settings}>
								<div>
									<img src={settings} alt="gear" />
									<Link to="/settings">Настройки</Link>
								</div>
								<div>
									<img src={logout} alt="logout" />
									<p onClick={exit}>Выйти</p>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Header
