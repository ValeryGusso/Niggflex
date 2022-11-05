import { FC, useState } from 'react'
import cls from './Header.module.css'
import logo from '../../Assets/img/logo.png'
import cross from '../../Assets/img/cross.svg'
import menu from '../../Assets/img/menu.svg'
import avatarDefaulf from '../../Assets/img/avatar_default.jpg'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import classNames from 'classnames'
import { headerMenu } from '../../Assets/constants'
import { useSelector } from 'react-redux'
import { authSelector } from '../../Redux/Slices/auth'

const Header: FC = () => {
	const [open, setOpen] = useState(false)
	const { isAuth } = useSelector(authSelector)

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
				<div className={cls.topBlock}>
					{isAuth ? (
						<>
							<p>User_01</p>
							<img src={avatarDefaulf} alt="avatar" />
						</>
					) : (
						<>
							<Link to="/registration">Регистрация</Link>
							<Link to="/login">Вход</Link>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
