import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import cls from './CardItem.module.css'
import classNames from 'classnames'
import { CardItemFilm } from '../../Interfaces/FilmsResponce'
import noimage from '../../Assets/img/noimage.png'

interface CardItemProps {
	film: CardItemFilm
}

const CardItem: FC<CardItemProps> = ({ film }) => {
	const [showDetails, setShowDetails] = useState<boolean>(false)

	function toggle() {
		setShowDetails(true)
	}

	return (
		<div className={cls.cartItem}>
			<div className={cls.content}>
			<Link to={`/film/${film.id}`}>{film.name}</Link>
				{showDetails ? (
					<div onPointerLeave={() => setShowDetails(false)} className={classNames(cls.back)}>
						<p>{film.description}</p>
					</div>
				) : (
					<div onClick={toggle} className={classNames(cls.face, showDetails ? cls.hideFace : '')}>
						<img src={film.poster ? film.poster.url : noimage} alt="image" />
					</div>
				)}
			</div>
		</div>
	)
}

export default CardItem
