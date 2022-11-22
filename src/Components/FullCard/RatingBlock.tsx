import { FC } from 'react'
import cls from './FullCard.module.css'
import kp from '../../Assets/img/kp.png'
import imdb from '../../Assets/img/imdb.png'
import star from '../../Assets/img/star.png'

interface RatingProps {
	KP: number
	IMDB: number
	GR: number
	FC: number
	ageRating: string
}

const RatingBlock: FC<RatingProps> = ({ KP, IMDB, GR, FC, ageRating }) => {
	return (
		<div className={cls.rating}>
			<div className={cls.block}>
				<img className={cls.star} src={star} alt="star" />
				<img className={cls.logo} src={kp} alt="kinopoisk" />
				<p>{KP ? KP.toFixed(1) : '---'}</p>
			</div>
			<div className={cls.block}>
				<img className={cls.star} src={star} alt="star" />
				<img className={cls.logo} src={imdb} alt="kinopoisk" />
				<p>{IMDB ? IMDB.toFixed(1) : '---'}</p>
			</div>
			<h2>{ageRating ? ageRating.match(/\d/g)?.join('') + '+' : ''}</h2>
		</div>
	)
}

export default RatingBlock
