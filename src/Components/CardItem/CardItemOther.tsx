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

interface CardItemOtherProps {
	film: Doc
}

const CardItemOther: FC<CardItemOtherProps> = ({ film }) => {
	const [showDetails, setShowDetails] = useState<boolean>(false)

	function toggle() {
		setShowDetails(true)
	}

	return (
		<div className={cls.cartItem}>
			<div className={cls.content}>
				{!showDetails && <Link to={`/film/${film.id}`}>{cut(film.name || film.alternativeName, 40)}</Link>}
				{showDetails ? (
					<div onPointerLeave={() => setShowDetails(false)} className={classNames(cls.back, cls.other)}>
						<p>{cut(film.shortDescription || film.description || 'Нет данных', 500)}</p>
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
										film.rating.imdb < 5 ? ratingColors[0] : film.rating.imdb < 7.5 ? ratingColors[1] : ratingColors[2],
								}}
							>
								{film.rating.imdb.toFixed(1) || '---'}
							</p>
						</div>
					</div>
				) : (
					<div onClick={toggle} className={classNames(cls.face, showDetails ? cls.hideFace : '')}>
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
