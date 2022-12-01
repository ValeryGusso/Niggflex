import { FC, useState, useRef } from 'react'
import logo from '../../Assets/img/logo.png'
import discord from '../../Assets/img/discord.svg'
import telegram from '../../Assets/img/telegram.png'
import check from '../../Assets/img/check.png'
import cls from './Footer.module.css'
import classNames from 'classnames'

const Footer: FC = () => {
	const [isCopiedDisc, setIsCopiedDisc] = useState(false)
	const [isCopiedTel, setIsCopiedTel] = useState(false)
	const timeout = useRef<ReturnType<typeof setTimeout>>()

	function copyD() {
		navigator.clipboard.writeText('Gus#6164')
		setIsCopiedDisc(true)
		if (isCopiedTel) {
			clearTimeout(timeout.current)
			setIsCopiedTel(false)
		}
		timeout.current = setTimeout(() => {
			setIsCopiedDisc(false)
		}, 3000)
	}

	function copyT() {
		navigator.clipboard.writeText('@gusso')
		setIsCopiedTel(true)
		if (isCopiedDisc) {
			clearTimeout(timeout.current)
			setIsCopiedDisc(false)
		}
		timeout.current = setTimeout(() => {
			setIsCopiedTel(false)
		}, 3000)
	}

	return (
		<div className={cls.footer}>
			<div className={cls.logo}>
				<img src={logo} alt="logo" />
				<p>всё, что ты любишь, но немного темнее.</p>
			</div>
			<div className={cls.description}>
				<p>
					Никакие права не защищены, сайт сделан чисто по-приколу. <br /> Готов работать за еду, Ваши предложения высылать на
					контактные данные, указанные немного правее.
				</p>
				<p>© {new Date().getFullYear()} Niggflex</p>
			</div>
			<div className={cls.contacts}>
				<p>По всем вопросам обращаться:</p>
				<div className={classNames(cls.block, isCopiedDisc ? cls.copy : '')}>
					<img onClick={copyD} src={isCopiedDisc ? check : discord} alt="discord" />
					<p>{isCopiedDisc ? 'Скопировано!' : 'Gus#6164'}</p>
				</div>
				<div className={classNames(cls.block, isCopiedTel ? cls.copy : '')}>
					<img onClick={copyT} src={isCopiedTel ? check : telegram} alt="telegram" />
					<p>{isCopiedTel ? 'Скопировано!' : '@gusso'}</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
