import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import lens from '../../Assets/img/lens.svg'
import axiosKPofficial from '../../axios/KPofficial'
import axiosKPunofficial from '../../axios/KPunofficial'
import { KeywordsActorResponse } from '../../Interfaces/KPofficial/keywords'
import { KeywordsFilmResponse } from '../../Interfaces/KPunofficial/keywords'
import { clearActors, setActorsState } from '../../Redux/Slices/searchActors'
import { clearFilms, setFilmsState } from '../../Redux/Slices/searchFilms'
import Results from './Results'
import cls from './Search.module.css'

const Search: FC = () => {
	const dispatch = useDispatch()
	const [active, setActive] = useState(false)
	const [search, setSearch] = useState('')
	const [films, setFilms] = useState<KeywordsFilmResponse>({} as KeywordsFilmResponse)
	const [actors, setActors] = useState<KeywordsActorResponse>({} as KeywordsActorResponse)
	const [filmsLoading, setFilmsLoading] = useState(true)
	const [actorsLoading, setActorsLoading] = useState(true)
	const [showResults, setShowResults] = useState(false)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	const submit = useCallback((keyword: string) => {
		setFilmsLoading(true)
		setActorsLoading(true)
		dispatch(clearFilms())
		dispatch(clearActors())
		axiosKPunofficial
			.get<KeywordsFilmResponse>('/v2.1/films/search-by-keyword', {
				params: {
					keyword: keyword,
				},
			})
			.then(res => {
				setFilms(res.data)
				setFilmsLoading(false)
				dispatch(setFilmsState({ keyword, total: res.data.searchFilmsCountResult }))
				if (!showResults) {
					setShowResults(true)
				}
			})

		const query: URL = new URL('https://api.kinopoisk.dev/person')
		query.searchParams.append('field', 'name')
		query.searchParams.append('search', keyword)
		query.searchParams.append('limit', '100')
		query.searchParams.append('isStrict', 'false')
		query.searchParams.append('sortField', 'name')
		query.searchParams.append('sortType', '1')

		axiosKPofficial.get<KeywordsActorResponse>(query.toString()).then(res => {
			setActors(res.data)
			setActorsLoading(false)
			dispatch(setActorsState({ keyword, total: res.data.total }))
			if (!showResults) {
				setShowResults(true)
			}
		})
	}, [])

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value)

		if (timer.current) {
			clearTimeout(timer.current)
		}

		timer.current = setTimeout(() => {
			submit(e.target.value)
		}, 1000)
	}

	const toggleInput = () => {
		setActive(!active)
		if (showResults && active) {
			setShowResults(false)
		}

		if (!showResults && (films?.films?.length > 0 || actors.docs?.length > 0)) {
			setShowResults(true)
		}
	}
	return (
		<div className={cls.search}>
			<input onChange={onChange} className={active ? cls.active : ''} value={search} placeholder="Что ищем?" />
			<img src={lens} alt="lens" onClick={toggleInput} />
			{showResults && (
				<div className={cls.results}>
					<Results
						films={films.films}
						actors={actors.docs}
						isLoadingFilms={filmsLoading}
						isLoadingActors={actorsLoading}
						overallFilms={films.searchFilmsCountResult}
						overallActors={actors.total}
						hide={setShowResults}
					/>
				</div>
			)}
		</div>
	)
}

export default Search
