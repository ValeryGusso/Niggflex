import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import cls from './CardItem.module.css'
import classNames from 'classnames'
import noimage from '../../Assets/img/noimage.png'
import { Country, Film } from '../../Interfaces/KPunofficial/premieres'
import { Genre } from '../../Interfaces/KPunofficial/search'
import Favorite from '../Buttons/Favorite'
import { cut } from '../../Utils/print'

interface CardItemPremieresProps {
	film: Film
}

const CardItemPremieres: FC<CardItemPremieresProps> = ({ film }) => {
	const [showDetails, setShowDetails] = useState<boolean>(false)

	function printCountry(array: Country[]): string {
		let countries: string[] = []
		array.forEach(el => countries.push(el.country))
		let result = countries.join(', ')
		if (array.length > 1) {
			result = 'ы: ' + result
		} else {
			result = 'а: ' + result
		}
		return result
	}

	function printGenres(array: Genre[]): string {
		let genres: string[] = []
		array.forEach(el => genres.push(el.genre))
		let result = genres.join(', ')
		if (array.length > 1) {
			result = 'ы: ' + result
		} else {
			result = ': ' + result
		}
		return result
	}

	return (
		<div className={cls.cartItem}>
			<div className={cls.content}>
				<Link to={`/film/${film.kinopoiskId}`}>{cut(film.nameRu || film.nameEn, 30)}</Link>
				{showDetails ? (
					<div onPointerLeave={() => setShowDetails(false)} className={classNames(cls.back, cls.premieres)}>
						<div>
							<Favorite type="icon" id={film.kinopoiskId} />{' '}
						</div>
						<p>Премьера: {film.premiereRu}</p>
						<p>Стран{printCountry(film.countries)}</p>
						<p>Жанр{printGenres(film.genres)}</p>
					</div>
				) : (
					<div onClick={() => setShowDetails(true)} className={classNames(cls.face, showDetails ? cls.hideFace : '')}>
						<img src={film.posterUrl ? film.posterUrl : noimage} alt="image" />
					</div>
				)}
			</div>
		</div>
	)
}

export default CardItemPremieres
