import { FC } from 'react'
import { Film } from '../../Interfaces/KPofficial/favorite'
import noimage from '../../Assets/img/noimage.png'
import KP from '../../Assets/img/kp.png'
import IMDB from '../../Assets/img/imdb.png'
import cls from './FavoriteItem.module.css'
import { cut } from '../../Utils/print'
import { ratingColors } from '../../Assets/constants'
import Favorite from '../Buttons/Favorite'
import { Link } from 'react-router-dom'

interface FavoriteItemProps {
	film: Film
}

const FavoriteItem: FC<FavoriteItemProps> = ({ film }) => {
	return (
		<div className={cls.wrapper}>
			<img src={film.poster.previewUrl || film.poster.url || noimage} alt="poster" />
			<div className={cls.title}>
				<div>
					<h2 className={cls.name}>
						<Link to={`/film/${film.id}`}>
							{film.name || film.alternativeName || 'Нет данных'} {film.year && `(${film.year})`}
						</Link>
					</h2>
					<h2 className={cls.name}>{film.movieLength && ` ${film.movieLength} мин.`}</h2>
				</div>
				<div className={cls.rating}>
					<img src={KP} alt="KP" />
					<h1
						style={{
							background:
								film.rating.kp < 5 ? ratingColors[0] : film.rating.kp < 7.5 ? ratingColors[1] : ratingColors[2],
						}}
					>
						{film.rating?.kp.toFixed(1) || '---'}
					</h1>
					<img src={IMDB} alt="IMDB" />
					<h1
						style={{
							background:
								film.rating.imdb < 5 ? ratingColors[0] : film.rating.imdb < 7.5 ? ratingColors[1] : ratingColors[2],
						}}
					>
						{film.rating?.imdb.toFixed(1) || '---'}
					</h1>
				</div>
				{/* <h3>{cut(film.description || film.shortDescription, 350)}</h3> */}
			</div>
			<div className={cls.button} title="Удалить из избранного">
				<Favorite id={film.id} type="icon" />
			</div>
		</div>
	)
}

export default FavoriteItem
