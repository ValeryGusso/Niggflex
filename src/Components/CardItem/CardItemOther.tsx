import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import cls from './CardItem.module.css'
import classNames from 'classnames'
import noimage from '../../Assets/img/noimage.png'
import KP from '../../Assets/img/kp.png'
import IMDB from '../../Assets/img/imdb.png'
import { Doc } from '../../Interfaces/KPofficial/search'
import { ratingColors } from '../../Assets/constants'
import { cut } from '../../Utils/print'
import Favorite from '../Buttons/Favorite'

interface CardItemOtherProps {
	film: Doc
}

const CardItemOther: FC<CardItemOtherProps> = ({ film }) => {
	const [showDetails, setShowDetails] = useState<boolean>(false)

	return (
		<div className={cls.cartItem}>
			<div className={cls.content}>
				{!showDetails && <Link to={`/film/${film.id}`}>{cut(film.name || film.alternativeName, 30)}</Link>}
				{showDetails ? (
					<div className={classNames(cls.back, cls.other)}>
						<p onClick={() => setShowDetails(false)}>
							{cut(film.shortDescription || film.description || 'Нет данных', 300)}
						</p>
						<div className={cls.blocks}>
							<div className={cls.block}>
								<img src={KP} alt="KP" />
								<p
									style={{
										background:
											film.rating.kp < 5 ? ratingColors[0] : film.rating.kp < 7.5 ? ratingColors[1] : ratingColors[2],
									}}
								>
									{film.rating.kp.toFixed(1) || '---'}
								</p>
							</div>
							<div className={cls.block}>
								<img src={IMDB} alt="IMDB" />
								<p
									style={{
										background:
											film.rating.imdb < 5
												? ratingColors[0]
												: film.rating.imdb < 7.5
												? ratingColors[1]
												: ratingColors[2],
									}}
								>
									{film.rating.imdb.toFixed(1) || '---'}
								</p>
							</div>
							<div className={cls.heart}>
								<Favorite type="icon" id={film.id} />{' '}
							</div>
						</div>
					</div>
				) : (
					<div onClick={() => setShowDetails(true)} className={classNames(cls.face, showDetails ? cls.hideFace : '')}>
						<img
							src={film.poster?.previewUrl || film.poster?.url ? film.poster.previewUrl || film.poster?.url : noimage}
							alt="image"
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default CardItemOther
