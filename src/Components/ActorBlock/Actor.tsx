import axios from 'axios'
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { fakeActor } from '../../Assets/fakeActor'
import Loader from '../../Components/Loader/Loader'
import { Movie, PersonResponse } from '../../Interfaces/Person'
import About from './About'
import cls from './ActorBlock.module.css'

const ActorBlock: FC = () => {
	const [person, setPerson] = useState({} as PersonResponse)
	const [showFacts, setShowFacts] = useState(false)
	const [loading, setLoading] = useState(true)
	const params = useParams()

	useEffect(() => {
		// axios
		// 	.get<PersonResponse>('https://api.kinopoisk.dev/person', {
		// 		params: {
		// 			token: '4KCTKW4-FNN45QN-NZFVTWV-XW8D358',
		// 			search: params.id,
		// 			field: 'id',
		// 		},
		// 	})
		// 	.then(res => {
		// 		const sortedMovies = res.data.movies.filter(el => el.rating)
		// 		sortedMovies.sort((a, b) => {
		// 			if (a.rating && b.rating) {
		// 				return b.rating - a.rating
		// 			} else return 0
		// 		})

		// 		let count = 15
		// 		const renderListMovies: Movie[] = sortedMovies.slice(0, count)

		// 		renderListMovies.forEach((el, i) => {
		// 			if (renderListMovies[i + 1]) {
		// 				if (el.id === renderListMovies[i + 1].id) {
		// 					el.description = `${el.description} / ${renderListMovies[i + 1].description}`
		// 					renderListMovies.splice(i + 1, 1)
		// 					renderListMovies.push(sortedMovies[count++])
		// 				}
		// 			}
		// 		})

		// 		res.data.movies = sortedMovies
		// 		setPerson({ ...res.data, sortedMovies, renderListMovies })
		// 		setLoading(false)
		// 	})

		setPerson(fakeActor)
		setLoading(false)
		// console.log(person)
	}, [])

	return (
		<div className={cls.actor}>
			{!loading ? (
				<div className={cls.container}>
					<div className={cls.profile}>
						<img src={person.photo} alt="photo" />
						<About person={person} />
					</div>
					<div className={cls.info}>
						<div className={cls.films}>
							<h2>Полулярные работы: </h2>
							{person.renderListMovies.map(film => (
								<Link to={'/film/' + film.id} key={film.id}>
									{film.name} / {film.description}
								</Link>
							))}
						</div>
						<div className={classNames(cls.facts, showFacts && cls.show)}>
							<button onClick={() => setShowFacts(!showFacts)}>
								{showFacts ? 'Скрыть' : `Интересные факты о ${person.name}`}
							</button>
							{person.facts.length > 0 && person.facts.map((fact, i) => <p key={i}>{fact.value}</p>)}
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
