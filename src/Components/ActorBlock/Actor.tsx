import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axiosKPofficial from '../../axios/KPofficial'
import axiosKPunofficial from '../../axios/KPunofficial'
import Loader from '../../Components/Loader/Loader'
import { FilmsResponse } from '../../Interfaces/KPofficial/films'
import { ActorResponse, Film as FIlmItem } from '../../Interfaces/KPunofficial/actor'
import About from './About'
import cls from './ActorBlock.module.css'
import Film from './Film'

interface Person extends ActorResponse {
	sortedMovies: FIlmItem[]
	renderListMovies: FIlmItem[]
}

const ActorBlock: FC = () => {
	const [person, setPerson] = useState({} as Person)
	const [showFacts, setShowFacts] = useState(false)
	const [films, setFIlms] = useState<FilmsResponse | null>(null)
	const [filmsLoading, setFIlmsLoading] = useState(true)
	const [loading, setLoading] = useState(true)
	const params = useParams()

	useEffect(() => {
		let id = 0
		axiosKPunofficial
			.get<ActorResponse>(`/v1/staff/${params.id}`)
			.then(res => {
				const sortedMovies = res.data.films.filter(el => el.rating)
				sortedMovies.sort((a, b) => {
					if (a.rating && b.rating) {
						return +b.rating - +a.rating
					} else return 0
				})

				let count = 15
				const renderListMovies: FIlmItem[] = sortedMovies.slice(0, count)

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
				id = res.data.personId
			})
			.then(() => {
				const query = new URL('https://api.kinopoisk.dev/movie')
				query.searchParams.append('field', 'persons.id')
				query.searchParams.append('search', `${id}`)
				query.searchParams.append('sortField', 'rating.kp')
				query.searchParams.append('sortType', '-1')
				query.searchParams.append('limit', '75')
				axiosKPofficial
					.get<FilmsResponse>(query.toString())
					.then(res => {
						setFIlms(res.data)
					})
					.finally(() => {
						setFIlmsLoading(false)
					})
			})
	}, [params.id])

	return (
		<div className={cls.actor}>
			{!loading ? (
				<div className={cls.container}>
					<div className={cls.profile}>
						<img src={person.posterUrl} alt="photo" />
						<About person={person} />
					</div>
					<div className={cls.info}>
						<h2>Полулярные работы: </h2>
						{films &&
							films.docs.length > 0 &&
							(filmsLoading ? (
								<div className={cls.loader}>
									<Loader />
								</div>
							) : (
								<div className={cls.films}>
									{films && films.docs?.length > 0 && films.docs.map((film, i) => <Film film={film} key={i} />)}
								</div>
							))}
						{person.facts.length > 0 && (
							<div className={cls.facts}>
								<button onClick={() => setShowFacts(!showFacts)}>
									{showFacts ? 'Скрыть' : `Интересные факты о ${person.nameRu || person.nameEn}`}
								</button>
								{person.facts.length > 0 && showFacts && person.facts.map((fact, i) => <p key={i}>{fact}</p>)}
							</div>
						)}
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default ActorBlock
