import { FC, useEffect } from 'react'
import { InView, useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import nosearch from '../../Assets/img/nosearch.webp'
import Loader from '../../Components/Loader/Loader'
import SearchActorItem from '../../Components/SearchItem/SearchActorItem'
import SearchFilmItem from '../../Components/SearchItem/SearchFilmItem'
import { fetchSearchActors, searchActorsSelector } from '../../Redux/Slices/searchActors'
import { fetchSearchFilms, FetchSearchFilmsArguments, searchFilmsSelector } from '../../Redux/Slices/searchFilms'
import { TypeDispatch } from '../../Redux/store'
import cls from './SearchResults.module.css'

interface SearchResultsProps {
	type: 'films' | 'actors'
}

const SearchResults: FC<SearchResultsProps> = ({ type }) => {
	const dispatch = useDispatch<TypeDispatch>()
	const {
		films,
		loading: filmsLoading,
		page: filmsPage,
		keyword: filmsKeyword,
		totalPages: filmsTotalPages,
		totalItems: filmsTotalItems,
	} = useSelector(searchFilmsSelector)
	const {
		actors,
		loading: actorsLoading,
		page: actorsPage,
		keyword: actorsKeyword,
		totalPages: actorsTotalPages,
		totalItems: actorsTotalItems,
	} = useSelector(searchActorsSelector)
	const { ref, entry } = useInView()

	useEffect(() => {
		if (entry?.isIntersecting && (films.length > 0 || actors.length > 0)) {
			if (filmsPage <= filmsTotalPages && type === 'films') {
				const payload: FetchSearchFilmsArguments = { keyword: filmsKeyword, page: filmsPage }
				dispatch(fetchSearchFilms(payload))
			}

			if (actorsPage <= actorsTotalPages && type === 'actors') {
				const payload: FetchSearchFilmsArguments = { keyword: filmsKeyword, page: filmsPage }
				dispatch(fetchSearchActors(payload))
			}
		}
	}, [entry])

	return (
		<div className={cls.wrapper}>
			{type === 'films' ? (
				<>
					<div className={cls.films}>
						{films.length > 0 ? (
							<>
								{' '}
								<InView>
									<div className={cls.contentFilms}>
										{films.map(film => (
											<SearchFilmItem film={film} key={film.filmId} />
										))}
										<div ref={ref} className={cls.hidenLine}></div>
									</div>
								</InView>
								{filmsLoading && (
									<div className={cls.loader}>
										<Loader />
									</div>
								)}
							</>
						) : (
							<img className={cls.nosearch} src={nosearch} alt="search nothing" />
						)}
					</div>
					<Link to="/search/actors">
						<h3>Показать людей</h3>
					</Link>
					<h2>{films.length > 0 ? `Загруженно ${films.length} из ${filmsTotalItems}` : 'Ничего не найденно :('}</h2>
				</>
			) : (
				<>
					<div className={cls.actors}>
						{actors.length > 0 ? (
							<>
								{' '}
								<InView>
									<div className={cls.contentActors}>
										{actors.map(actor => (
											<SearchActorItem actor={actor} key={actor.id} />
										))}
										<div ref={ref} className={cls.hidenLine}></div>
									</div>
								</InView>
								{actorsLoading && (
									<div className={cls.loader}>
										<Loader />
									</div>
								)}
							</>
						) : (
							<img className={cls.nosearch} src={nosearch} alt="search nothing" />
						)}
					</div>
					<Link to="/search/films">
						<h3>Показать фильмы</h3>
					</Link>
					<h2>{actors.length > 0 ? `Загруженно ${actors.length} из ${actorsTotalItems}` : 'Ничего не найденно :('}</h2>
				</>
			)}
		</div>
	)
}

export default SearchResults
