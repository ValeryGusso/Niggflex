import { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setTimeout } from 'timers/promises'
import axiosKPunofficial from '../../axios/KPunofficial'
import DancingText from '../../Components/DancingText/DancingText'
import { Film, TopResponse } from '../../Interfaces/KPunofficial/top'
import { authSelector } from '../../Redux/Slices/auth'
import { backgroundSelector } from '../../Redux/Slices/background'
import cls from './Home.module.css'

const Home: FC = () => {
	const { isAuth, name } = useSelector(authSelector)
	const { row1, row2, row3, loading } = useSelector(backgroundSelector)

	return (
		<div className={cls.wrapper}>
			<div className={cls.title}>
				<h1>Добро пожаловать на </h1>
				<DancingText text="NIGGFLEX" /> <h1>, возможно, самый лучший сайт о кино во Вселенной!</h1>
			</div>
			<div className={cls.background}>
				{loading ? null : (
					<>
						<div className={cls.row}>
							{row1?.length > 0 &&
								row1.map((el, i) => (
									<div key={i}>
										<img src={el} />
									</div>
								))}
						</div>
						<div className={cls.row}>
							{row2?.length > 0 &&
								row2.map((el, i) => (
									<div key={i}>
										<img src={el} />
									</div>
								))}
						</div>
						<div className={cls.row}>
							{row3?.length > 0 &&
								row3.map((el, i) => (
									<div key={i}>
										<img src={el} />
									</div>
								))}
						</div>
					</>
				)}
			</div>
			<div className={cls.description}>
				{isAuth ? (
					<h1>
						Приветствую тебя, <Link to="/settings">{name},</Link> рад что ты снова сюда заглянул :) <br />
						Давай поищем <Link to="/films">фильмы,</Link> а может быть лучше <Link to="/series">сериалы?</Link> Или на
						этот раз ты пришёл сюда за <Link to="/premieres">премьерами</Link>? <br />
						А, впрочем, неважно, <Link to="/filters">ищи</Link> то, что тебе по душе и наслаждайся!
					</h1>
				) : (
					<h1>
						Если у вас по какой-то причине до сих про нет аккаунта, то это необходимо срочно{' '}
						<Link to="/registration">исправить.</Link> <br /> <Link to="/login">Авторизация</Link> позволяет
						использовать весь доступный функционал, включая списки избранного и отметки о просмотре фильмов/сериалов.
					</h1>
				)}
			</div>
		</div>
	)
}

export default Home
