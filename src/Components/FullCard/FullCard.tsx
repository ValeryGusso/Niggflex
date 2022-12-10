import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { filmMenu } from '../../Assets/constants'
import axiosKPunofficial from '../../axios/KPunofficial'
import { Fact, FactsResponse } from '../../Interfaces/KPunofficial/facts'
import { FilmResponse } from '../../Interfaces/KPunofficial/film'
import { StaffResponse } from '../../Interfaces/KPunofficial/staff'
import Favorite from '../Buttons/Favorite'
import Viewed from '../Buttons/Viewed'
import Loader from '../Loader/Loader'
import About from './About'
import Actors from './Actors'
import Awards from './Awards'
import cls from './FullCard.module.css'
import Images from './Images'
import Markup from './Markup'
import RatingBlock from './RatingBlock'
import Reviews from './Reviews'
import Similars from './Similars'

const FullCard: FC = () => {
	const [active, setActive] = useState('description')
	const [loading, setLoading] = useState<boolean>(true)
	const [film, setFilm] = useState<FilmResponse | null>(null)
	const [staff, setStaff] = useState<StaffResponse | null>(null)
	const [facts, setFacts] = useState<Fact[] | null>(null)
	const params = useParams()

	useEffect(() => {
		setLoading(true)
		axiosKPunofficial
			.get<FilmResponse>(`/v2.2/films/${params.id}`)
			.then(res => {
				setFilm(res.data)
			})
			.finally(() => {
				setLoading(false)
			})

		axiosKPunofficial.get<FactsResponse>(`/v2.2/films/${params.id}/facts`).then(res => {
			setFacts(res.data.items)
		})

		axiosKPunofficial
			.get<StaffResponse>(`/v1/staff`, {
				params: {
					filmId: params.id,
				},
			})
			.then(res => {
				setStaff(res.data)
			})
		window.scrollTo(0, 0)
	}, [params.id])

	return (
		<div className={cls.card}>
			{loading ? (
				<div className={cls.loader}>
					<Loader />
				</div>
			) : (
				<div className={cls.container}>
					<div className={cls.mainInfo}>
						<div>
							<div className={cls.poster}>
								<img src={film?.posterUrl} alt="poster" />
								{film ? (
									<RatingBlock
										KP={film.ratingKinopoisk}
										IMDB={film.ratingImdb}
										GR={film.ratingGoodReview}
										FC={film.ratingFilmCritics}
										ageRating={film.ratingAgeLimits}
									/>
								) : (
									''
								)}
							</div>
							<div className={cls.header}>
								<h1>
									{film?.nameRu} ({film?.year})
								</h1>
								<h2>{film?.nameOriginal}</h2>
								<div className={cls.aboutDiv}>{film && <About film={film} />}</div>
							</div>
						</div>
						{film && (
							<div className={cls.buttons}>
								<div className={cls.favorite}>
									<Favorite id={film.kinopoiskId} type="icon" />
								</div>
								<div className={cls.viewed}>
									<Viewed id={film.kinopoiskId} type={film.type} />
								</div>
							</div>
						)}
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
							{active === 'facts' &&
								facts &&
								(facts.length > 0 ? (
									facts.map((el, i) => <Markup string={el.text} key={i} />)
								) : (
									<p>К сожалению про этот фильм нет никаких фактов...</p>
								))}
							{(active === 'group' || active === 'actors') && film && staff && <Actors persons={staff} type={active} />}
							{active === 'images' && film && <Images id={film.kinopoiskId} />}
						</div>
					</div>
					{film && (
						<>
							<Awards />
							<Similars id={film.kinopoiskId} />
							<Reviews id={film.kinopoiskId} />
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default FullCard
