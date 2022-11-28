import { FC, useEffect } from 'react'
import CardItemOther from '../../Components/CardItem/CardItemOther'
import Loader from '../../Components/Loader/Loader'
import cls from './Novelty.module.css'
import Poster from './Poster'
import { useSelector } from 'react-redux'
import { fetchNovelty, noveltySelector } from '../../Redux/Slices/novelty'
import { useDispatch } from 'react-redux'
import { InView, useInView } from 'react-intersection-observer'

interface NoveltyProps {
	type: number
}

const Novelty: FC<NoveltyProps> = ({ type }) => {
	const dispatch = useDispatch()
	const { ref, entry } = useInView()
	const { items, loading, totalItems, totalPages, page } = useSelector(noveltySelector)

	function createQuery(): URL {
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
		const query = createQuery()
		// @ts-ignore
		dispatch(fetchNovelty(query))
	}, [])

	useEffect(() => {
		if (entry?.isIntersecting && items.length > 0) {
			if (page <= totalPages) {
				// @ts-ignore
				dispatch(fetchNovelty(query))
			}
		}
	}, [entry])

	function printType(type: number): string {
		switch (type) {
			case 1:
				return 'кино'
			case 2:
				return 'сериалов'
			case 3:
				return 'мультфильмов'
			case 4:
				return 'аниме'
			case 5:
				return 'хз чего'
			default:
				return ''
		}
	}
	return (
		<div className={cls.container}>
			<h1>Новинки {printType(type)}, выбирай что тебе по душе!</h1>
			{/* {!loading && data.length > 0 && <Poster film={data[0]} />} */}
			<div className={cls.content}>
				<InView>
					{!loading && items.length > 0 && items.map(film => <CardItemOther key={film.id} film={film} />)}
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
