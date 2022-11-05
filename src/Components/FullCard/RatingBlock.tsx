import { FC } from 'react'
import { Rating } from '../../Interfaces/Film'
import cls from './FullCard.module.css'
import kp from '../../Assets/img/kp.png'
import imdb from '../../Assets/img/imdb.png'
import star from '../../Assets/img/star.png'

interface RatingProps {
	rating: Rating
	ageRating: number
}

const RatingBlock: FC<RatingProps> = ({ rating, ageRating }) => {
	return (
		<div className={cls.rating}>
			<div className={cls.block}>
				<img className={cls.star} src={star} alt="star" />
				<img className={cls.logo} src={kp} alt="kinopoisk" />
				<p>{rating.kp.toFixed(1)}</p>
			</div>
			<div className={cls.block}>
				<img className={cls.star} src={star} alt="star" />
				<img className={cls.logo} src={imdb} alt="kinopoisk" />
				<p>{rating.imdb.toFixed(1)}</p>
			</div>
			<h2>{ageRating ? ageRating + '+' : ''}</h2>
		</div>
	)
}

export default RatingBlock
