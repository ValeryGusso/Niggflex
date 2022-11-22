import { FC, useEffect, useState } from 'react'
import axiosKPunofficial from '../../axios/KPunofficial'
import CardItemPremieres from '../../Components/CardItem/CardItemPremieres'
import Loader from '../../Components/Loader/Loader'
import { Film, PremieresResponse } from '../../Interfaces/KPunofficial/premieres'
import { months } from '../../Assets/constants'
import cls from './Premieres.module.css'

const Premieres: FC = () => {
	const [films, setFilms] = useState<Film[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axiosKPunofficial
			.get<PremieresResponse>('/v2.2/films/premieres', {
				params: {
					year: new Date().getFullYear(),
					month: months[new Date().getMonth()],
				},
			})
			.then(res => {
				setFilms(res.data.items)
				setLoading(false)
			})
	}, [])

	return (
		<div className={cls.container}>
			<h1>Премьеры этого месяца. Что будем смотреть?</h1>
			<div>
				{films.length > 0 && films.map(film => <CardItemPremieres key={film.kinopoiskId} film={film} />)}
				{loading && (
					<div className={cls.loader}>
						<Loader />
					</div>
				)}
			</div>
		</div>
	)
}

export default Premieres