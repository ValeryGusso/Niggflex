import { FC } from 'react'
import cls from './SmallCard.module.css'
import { CardItemFilm } from '../../Interfaces/FilmsResponce'
import { Link } from 'react-router-dom'
import noimage from '../../Assets/img/noimage.png'

interface SmallCardProps {
	film: CardItemFilm
}

const SmallCard: FC<SmallCardProps> = ({ film }) => {
	return (
		<div className={cls.container}>
			<img src={film.poster?.previewUrl || noimage} alt="poster" />
			<div className={cls.description}>
				<Link to={'/film/' + film.id}>
					{film.name || film.enName} ({film.year})
				</Link>
				<h2>
					{film.shortDescription ||
						film.description ||
						'Нет данных, так что стоит посмотреть самому и обо всём узнать :)'}
				</h2>
			</div>
			<div className={cls.buttons}>
				<div>
					<p>Добавить в избранное</p>
				</div>
				<div>
					<p>Уже смотрел</p>
				</div>
			</div>
		</div>
	)
}

export default SmallCard
