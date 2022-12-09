import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import cls from './CardItem.module.css'
import classNames from 'classnames'
import noimage from '../../Assets/img/noimage.png'
import { Film } from '../../Interfaces/KPunofficial/premieres'
import Favorite from '../Buttons/Favorite'
import { cut, printPremieresCountry, printPremieresGenres } from '../../Utils/print'

interface CardItemPremieresProps {
	film: Film
}

const CardItemPremieres: FC<CardItemPremieresProps> = ({ film }) => {
	const [showDetails, setShowDetails] = useState<boolean>(false)

	return (
		<div className={cls.cartItem}>
			<div className={cls.content}>
				<Link to={`/film/${film.kinopoiskId}`}>{cut(film.nameRu || film.nameEn, 30)}</Link>
				{showDetails ? (
					<div className={classNames(cls.back, cls.premieres)}>
						<div>
							<Favorite type="icon" id={film.kinopoiskId} />{' '}
						</div>
						<p onClick={() => setShowDetails(false)}>Премьера: {film.premiereRu}</p>
						<p onClick={() => setShowDetails(false)}>Стран{printPremieresCountry(film.countries)}</p>
						<p onClick={() => setShowDetails(false)}>Жанр{printPremieresGenres(film.genres)}</p>
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
