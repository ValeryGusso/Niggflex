import { FC, useEffect } from 'react'
import CardItemOther from '../../Components/CardItem/CardItemOther'
import Loader from '../../Components/Loader/Loader'
import cls from './Novelty.module.css'
import { useSelector } from 'react-redux'
import { clearNovelty, fetchNovelty, noveltySelector } from '../../Redux/Slices/novelty'
import { useDispatch } from 'react-redux'
import { InView, useInView } from 'react-intersection-observer'
import { TypeDispatch } from '../../Redux/store'
import { useLocation } from 'react-router'
import { printNoveltyType } from '../../Utils/print'

interface NoveltyProps {
	type: number
}

const Novelty: FC<NoveltyProps> = ({ type }) => {
	const location = useLocation()
	const dispatch = useDispatch<TypeDispatch>()
	const { ref, entry } = useInView()
	const { items, loading, totalItems, totalPages, page } = useSelector(noveltySelector)

	function createQuery(page: string | number): URL {
		const url = new URL('https://api.kinopoisk.dev/movie')
		url.searchParams.append('field', 'year')
		url.searchParams.append('search', '2022')
		url.searchParams.append('field', 'rating.kp')
		url.searchParams.append('search', '1-10')
		url.searchParams.append('field', 'typeNumber')
		url.searchParams.append('search', `${type}`)
		url.searchParams.append('limit', '100')
		url.searchParams.append('page', page.toString())
		return url
	}

	useEffect(() => {
		const query = createQuery(1)
		dispatch(clearNovelty())
		dispatch(fetchNovelty(query))
	}, [location.pathname])

	useEffect(() => {
		const query = createQuery(page)
		if (entry?.isIntersecting && items.length > 0) {
			if (page <= totalPages) {
				dispatch(fetchNovelty(query))
			}
		}
	}, [entry])

	return (
		<div className={cls.container}>
			<h1>Новинки {printNoveltyType(type)}, выбирай что тебе по душе!</h1>
			<div className={cls.content}>
				<InView>
					{items.length > 0 && items.map(film => <CardItemOther key={film.id} film={film} />)}
					<div ref={ref} className={cls.hidenLine}></div>
				</InView>
				{loading && (
					<div className={cls.loader}>
						<Loader />
					</div>
				)}
			</div>
			<h2>
				Загружено {items.length} из {totalItems}
			</h2>
		</div>
	)
}

export default Novelty
