import { FC } from 'react'
import cls from './SmallCard.module.css'
import { Link } from 'react-router-dom'
import noimage from '../../Assets/img/noimage.png'
import Viewed from '../Buttons/Viewed'
import Favorite from '../Buttons/Favorite'
import KP from '../../Assets/img/kp.png'
import IMDB from '../../Assets/img/imdb.png'
import { Film } from '../../Interfaces/KPunofficial/search'
import { ratingColors } from '../../Assets/constants'

interface SmallCardProps {
	film: Film
}

const SmallCard: FC<SmallCardProps> = ({ film }) => {
	return (
		<div className={cls.container}>
			<img src={film.posterUrl || noimage} alt="poster" />
			<div className={cls.description}>
				<Link to={'/film/' + film.kinopoiskId}>
					{film.nameRu || film.nameOriginal} ({film.year || 'Нет данных'})
				</Link>
				<div className={cls.rating}>
					<div className={cls.block}>
						<img src={KP} alt="KP" />
						<p
							style={{
								background:
									film.ratingKinopoisk < 5
										? ratingColors[0]
										: film.ratingKinopoisk < 7.5
										? ratingColors[1]
										: ratingColors[2],
							}}
						>
							{film.ratingKinopoisk || '---'}
						</p>
					</div>
					<div className={cls.block}>
						<img src={IMDB} alt="KP" />
						<p
							style={{
								background:
									film.ratingImdb < 5 ? ratingColors[0] : film.ratingImdb < 7.5 ? ratingColors[1] : ratingColors[2],
							}}
						>
							{film.ratingImdb || '---'}
						</p>
					</div>
				</div>
			</div>
			<div className={cls.buttons}>
				<Favorite id={film.kinopoiskId} type='button' />
				<Viewed id={film.kinopoiskId} type={film.type} />
			</div>
		</div>
	)
}

export default SmallCard
