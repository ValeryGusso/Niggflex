import { FC, useState } from 'react'
import { Film } from '../../Interfaces/KPunofficial/keywords'
import noimage from '../../Assets/img/noimage.png'
import cls from './Search.module.css'
import { Link } from 'react-router-dom'
import Image from './Image'
import { ratingColors } from '../../Assets/constants'
import { printCountries, printGenres } from '../../Utils/print'

interface FilmItemProps {
	film: Film
}

const FilmItem: FC<FilmItemProps> = ({ film }) => {
	const [showImage, setShowImage] = useState(false)

	return (
		<div className={cls.film}>
			<img onClick={() => setShowImage(true)} src={film.posterUrlPreview || noimage} alt="poster" />
			<div>
				<Link to={`/film/${film.filmId}`}>
					{' '}
					<h2>{`${film.nameRu || film.nameEn} (${film.year || '---'})`}</h2>
				</Link>
				<h3>
					{printCountries(film.countries)}
					{film.rating !== 'null' ? (
						<span
							style={{
								background: +film.rating < 5 ? ratingColors[0] : +film.rating < 7.5 ? ratingColors[1] : ratingColors[2],
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
				</h3>
				<h3>{printGenres(film.genres)} </h3>
			</div>
			{showImage && (
				<div className={cls.cart} style={{ top: '10vmin', left: '22vmax' }}>
					<Image url={film.posterUrl || noimage} hide={setShowImage} />
				</div>
			)}
		</div>
	)
}

export default FilmItem
