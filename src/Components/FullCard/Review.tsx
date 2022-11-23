import { FC, useState } from 'react'
import { reviewsColors } from '../../Assets/constants'
import { Item } from '../../Interfaces/KPunofficial/reviews'
import { cut } from '../../Utils/print'
import Like from '../Like/Like'
import cls from './FullCard.module.css'

interface ReviewProps {
	review: Item
}

const Review: FC<ReviewProps> = ({ review }) => {
	const [showAll, setShowAll] = useState(false)
	function setBackgroundColor(type: string): string {
		switch (type) {
			case 'POSITIVE':
				return reviewsColors[0]
			case 'NEUTRAL':
				return reviewsColors[1]
			case 'NEGATIVE':
				return reviewsColors[2]

			default:
				return ''
		}
	}
	return (
		// <div className={cls.reviewWrapper}>
		<div className={cls.review} style={{ border: `5px solid ${setBackgroundColor(review.type)}` }}>
			<h2>{review.author}</h2>
			<h3>{review.title}</h3>
			<p>{showAll ? review.description : cut(review.description, 500)}</p>
			{review.description.length > 500 && (
				<h4 onClick={() => setShowAll(!showAll)}>{showAll ? 'Скрыть' : 'Показать полный текст рецензии'}</h4>
			)}
			<div>
				<h2>{new Date(review.date).toLocaleDateString()}</h2>
				<div>
					<Like type="like" count={review.positiveRating} />
					<Like type="dislike" count={review.negativeRating} />
				</div>
			</div>
		</div>
		// </div>
	)
}

export default Review
