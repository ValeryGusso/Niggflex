import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { filmMenu } from '../../Assets/constants'
import { fakeFilm } from '../../Assets/fakeFilm'
import { FilmResponce } from '../../Interfaces/Film'
import Loader from '../Loader/Loader'
import About from './About'
import Actors from './Actors'
import cls from './FullCard.module.css'
import Images from './Images'
import RatingBlock from './RatingBlock'

const FullCard: FC = () => {
	const [active, setActive] = useState('description')
	const [loading, setLoading] = useState<boolean>(true)
	const [film, setFilm] = useState<FilmResponce | null>(null)
	const params = useParams()

	useEffect(() => {
		// axios
		// 	.get('https://api.kinopoisk.dev/movie', {
		// 		params: {
		// 			token: '4KCTKW4-FNN45QN-NZFVTWV-XW8D358',
		// 			search: params.id,
		// 			field: 'id',
		// 		},
		// 	})
		// 	.then(res => {
		// 		setFilm(res.data)
		// 		setLoading(false)
		// 	})

		// axios
		// 	.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/326', {
		// 		headers: {
		// 			'X-API-KEY': '062b7bcf-9582-4713-bef9-1b0e908cfb6d',
		// 		},
		// 	})
		// 	.then(res => {
		// 		console.log(res.data)
		// 	})

		setFilm(fakeFilm)
		setLoading(false)
	}, [])

	return (
		<div className={cls.card}>
			{loading ? (
				<Loader />
			) : (
				<div className={cls.container}>
					<div className={cls.mainInfo}>
						<div className={cls.poster}>
							<img src={film?.poster.url} alt="poster" />
							{film ? <RatingBlock rating={film.rating} ageRating={film.ageRating} /> : ''}
						</div>
						<div className={cls.header}>
							<h1>
								{film?.name} ({film?.year})
							</h1>
							<h2>{film?.alternativeName}</h2>
							<div>{film && <About film={film} />}</div>
						</div>
					</div>
					<div className={cls.info}>
						<div className={cls.menuBar}>
							{filmMenu.map(el => (
								<p onClick={() => setActive(el.value)} className={el.value === active ? cls.active : ''} key={el.value}>
									{el.title}
								</p>
							))}
						</div>
						<div className={cls.menuContent}>
							{active === 'description' && <p>{film?.description}</p>}
							{active === 'facts' && film?.facts.map((el, i) => <p key={i}>{el.value}</p>)}
							{(active === 'group' || active === 'actors') && film && <Actors persons={film.persons} type={active} />}
							{active === 'images' && film && <Images id={film.id} />}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default FullCard
