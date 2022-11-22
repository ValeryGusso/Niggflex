import { FC, useState } from 'react'
import { Film } from '../../Interfaces/KPunofficial/keywords'
import noimage from '../../Assets/img/noimage.png'
import cls from './SearchItem.module.css'
import { Link } from 'react-router-dom'
import { cut, printCountries, printGenres } from '../../Utils/print'
import { ratingColors } from '../../Assets/constants'
import Favorite from '../Buttons/Favorite'

interface SearchFilmItemProps {
	film: Film
}

const SearchFilmItem: FC<SearchFilmItemProps> = ({ film }) => {
	const [showDescription, setShowDescription] = useState(false)

	return (
		<div className={cls.containerFilm}>
			<img
				onClick={() => setShowDescription(!showDescription)}
				src={film.posterUrlPreview || film.posterUrl || noimage}
				alt="poster"
			/>
			<div className={cls.block}>
				<Link to={`/film/${film.filmId}`}>
					<h2>{`${film.nameRu || film.nameEn} (${film.year || '---'})`}</h2>
				</Link>
				{showDescription ? (
					<p>{film.description ? cut(film.description, 300) : 'Нет данных'}</p>
				) : (
					<>
						<div className={cls.title}>
							<h3>{printCountries(film.countries)}</h3>
							{film.rating !== 'null' ? (
								<span
									style={{
										background:
											+film.rating < 5 ? ratingColors[0] : +film.rating < 7.5 ? ratingColors[1] : ratingColors[2],
									}}
								>
									{film.rating}
								</span>
							) : (
								<span
									style={{
										background: ratingColors[0],
									}}
								>
									---
								</span>
							)}
							<Favorite id={film.filmId} type="icon" />
						</div>
						<h3>{printGenres(film.genres)} </h3>
					</>
				)}
			</div>
		</div>
	)
}

export default SearchFilmItem
