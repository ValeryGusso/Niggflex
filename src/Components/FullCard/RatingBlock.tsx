import { FC, useEffect, useState } from 'react'
import cls from './FullCard.module.css'
import kp from '../../Assets/img/kp.png'
import imdb from '../../Assets/img/imdb.png'
import star from '../../Assets/img/star.png'
import { ratingColors } from '../../Assets/constants'

interface RatingProps {
	KP: number
	IMDB: number
	GR: number
	FC: number
	ageRating: string
}

const RatingBlock: FC<RatingProps> = ({ KP, IMDB, GR, FC, ageRating }) => {
	const [rating, setRating] = useState(0)
	useEffect(() => {
		const value = ageRating?.match(/\d/g)?.join('')
		if (value) {
			setRating(+value)
		}
	}, [])
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
			<h2 style={{ background: rating < 12 ? ratingColors[2] : rating > 16 ? ratingColors[0] : ratingColors[1] }}>
				{ageRating ? rating + '+' : ''}
			</h2>
		</div>
	)
}

export default RatingBlock
