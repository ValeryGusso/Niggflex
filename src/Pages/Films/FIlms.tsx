import { FC, useEffect, useRef } from 'react'
import { useInView, InView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fakeFilms } from '../../Assets/fakeFilms'
import CardItem from '../../Components/CardItem/CardItem'
import Loader from '../../Components/Loader/Loader'
import { clear, fetchFilms, filmsSelector, update } from '../../Redux/Slices/films'
import { TypeDispatch } from '../../Redux/store'
import cls from './Films.module.css'

const Films: FC = () => {
	const dispatch = useDispatch<TypeDispatch>()
	const { data: films, loading } = useSelector(filmsSelector)
	const { ref, entry } = useInView()
	const query = useRef<URL>(new URL('https://api.kinopoisk.dev/movie/'))

	useEffect(() => {
		// const page = Math.floor(Math.random() * 75)

		// query.current.searchParams.append('field', 'year')
		// query.current.searchParams.append('search', '2021-2022')
		// query.current.searchParams.append('field', 'rating.kp')
		// query.current.searchParams.append('search', '7-10')
		// query.current.searchParams.append('page', page.toString())
		// query.current.searchParams.append('limit', '9')
		// query.current.searchParams.append('token', '4KCTKW4-FNN45QN-NZFVTWV-XW8D358')
		// dispatch(fetchFilms(query.current))

		dispatch(update(fakeFilms))
		return (): void => {
			dispatch(clear())
		}
	}, [])

	// useEffect(() => {
	// 	if (entry?.isIntersecting && films.length > 0) {
	// 		const page = Math.floor(Math.random() * 75)
	// 		query.current.searchParams.set('page', page.toString())
	// 		dispatch(fetchFilms(query.current))
	// 	}
	// }, [entry])

	return (
		<InView>
			<div className={cls.container}>
				{films.length > 0 && films.map(film => <CardItem key={film.id} film={film} />)}
				{loading && (
					<div className={cls.loader}>
						<Loader />
					</div>
				)}
				<div ref={ref} className={cls.hidenLine}></div>
			</div>
		</InView>
	)
}

export default Films
