import { FC, useState, useEffect } from 'react'
import CardItemOther from '../../Components/CardItem/CardItemOther'
import Loader from '../../Components/Loader/Loader'
import axiosKPofficial from '../../axios/KPofficial'
import { Doc, SearchResponse } from '../../Interfaces/KPofficial/search'
import cls from './Novelty.module.css'
import Poster from './Poster'

interface NoveltyProps {
	type: number
}

const Novelty: FC<NoveltyProps> = ({ type }) => {
	const [data, setData] = useState<Doc[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const query = new URL('https://api.kinopoisk.dev/movie')
		query.searchParams.append('field', 'year')
		query.searchParams.append('search', '2022')
		query.searchParams.append('field', 'rating.kp')
		query.searchParams.append('search', '1-10')
		query.searchParams.append('field', 'typeNumber')
		query.searchParams.append('search', `${type}`)
		query.searchParams.append('limit', '100')
		axiosKPofficial.get<SearchResponse>(query.toString()).then(res => {
			setData(res.data.docs)
			setLoading(false)
		})
	}, [])

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
			{!loading && data.length > 0 && <Poster film={data[0]} />}
			<div>
				{!loading && data.length > 0 && data.map(film => <CardItemOther key={film.id} film={film} />)}
				{loading && (
					<div className={cls.loader}>
						<Loader />
					</div>
				)}
			</div>
		</div>
	)
}

export default Novelty
