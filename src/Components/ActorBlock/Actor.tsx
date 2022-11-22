import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axiosKPunofficial from '../../axios/KPunofficial'
import Loader from '../../Components/Loader/Loader'
import { ActorResponse, Film } from '../../Interfaces/KPunofficial/actor'
import About from './About'
import cls from './ActorBlock.module.css'

interface Person extends ActorResponse {
	sortedMovies: Film[]
	renderListMovies: Film[]
}

const ActorBlock: FC = () => {
	const [person, setPerson] = useState({} as Person)
	const [showFacts, setShowFacts] = useState(false)
	const [loading, setLoading] = useState(true)
	const params = useParams()

	useEffect(() => {
		axiosKPunofficial.get<ActorResponse>(`/v1/staff/${params.id}`).then(res => {
			const sortedMovies = res.data.films.filter(el => el.rating)
			sortedMovies.sort((a, b) => {
				if (a.rating && b.rating) {
					return +b.rating - +a.rating
				} else return 0
			})

			let count = 15
			const renderListMovies: Film[] = sortedMovies.slice(0, count)

			renderListMovies.forEach((el, i) => {
				if (renderListMovies[i + 1]) {
					if (el.filmId === renderListMovies[i + 1].filmId) {
						el.description = `${el.description} / ${renderListMovies[i + 1].description}`
						renderListMovies.splice(i + 1, 1)
						renderListMovies.push(sortedMovies[count++])
					}
				}
			})

			res.data.films = sortedMovies
			setPerson({ ...res.data, sortedMovies, renderListMovies })
			setLoading(false)
		})
	}, [])

	return (
		<div className={cls.actor}>
			{!loading ? (
				<div className={cls.container}>
					<div className={cls.profile}>
						<img src={person.posterUrl} alt="photo" />
						<About person={person} />
					</div>
					<div className={cls.info}>
						<div className={cls.films}>
							<h2>Полулярные работы: </h2>
							{person.renderListMovies.map(film => (
								<Link to={'/film/' + film.filmId} key={film.filmId}>
									{film.nameRu || film.nameEn} / {film.description}
								</Link>
							))}
						</div>
						<div className={classNames(cls.facts, showFacts && cls.show)}>
							<button onClick={() => setShowFacts(!showFacts)}>
								{showFacts ? 'Скрыть' : `Интересные факты о ${person.nameRu || person.nameEn}`}
							</button>
							{person.facts.length > 0 && person.facts.map((fact, i) => <p key={i}>{fact}</p>)}
						</div>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default ActorBlock
