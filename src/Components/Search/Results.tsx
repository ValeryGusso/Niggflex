import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Actor } from '../../Interfaces/KPofficial/keywords'
import { Film } from '../../Interfaces/KPunofficial/keywords'
import { updateActors } from '../../Redux/Slices/searchActors'
import { updateFilms } from '../../Redux/Slices/searchFilms'
import Loader from '../Loader/Loader'
import ActorItem from './ActorItem'
import FilmItem from './FilmItem'
import cls from './Search.module.css'

interface ResultsProps {
	films: Film[]
	actors: Actor[]
	isLoadingFilms: boolean
	isLoadingActors: boolean
	overallFilms: number
	overallActors: number
	hide: React.Dispatch<React.SetStateAction<boolean>>
}

const Results: FC<ResultsProps> = ({
	films,
	actors,
	isLoadingFilms,
	isLoadingActors,
	overallFilms,
	overallActors,
	hide,
}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	function redirect(to: 'films' | 'actors') {
		dispatch(updateFilms(films))
		dispatch(updateActors(actors))

		navigate(`/search/${to}`)
		hide(false)
	}

	return (
		<div className={cls.wrapper}>
			{isLoadingFilms ? (
				<div className={cls.loader}>
					<Loader />
				</div>
			) : (
				<div className={cls.films}>
					{films.length > 0 && <h2>Фильмы/сериалы:</h2>}
					<div>
						{films.map(film => (
							<FilmItem film={film} key={film.filmId} />
						))}
					</div>
					{films.length > 0 ? (
						<div className={cls.info}>
							<h2>Всего найдено: {overallFilms}</h2>
							<h3 onClick={() => redirect('films')}>показать все</h3>
						</div>
					) : (
						<div className={cls.nothing}>
							<h2>К сожалению, по запросу ничего не найдено! Попробуй найти что-то другое.</h2>
						</div>
					)}
				</div>
			)}
			{isLoadingActors ? (
				<div className={cls.loader}>
					<Loader />
				</div>
			) : (
				<div className={cls.actors}>
					{actors.length > 0 && <h2>Актёры:</h2>}
					<div>
						{actors.map(actor => (
							<ActorItem actor={actor} key={actor.id} />
						))}
					</div>
					{actors.length > 0 ? (
						<div className={cls.info}>
							<h2>Всего найдено: {overallActors}</h2>

							<h3 onClick={() => redirect('actors')}>показать всех</h3>
						</div>
					) : (
						<div className={cls.nothing}>
							<h2>К сожалению, по запросу ничего не найдено! Попробуй поискать что-то другое.</h2>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Results
