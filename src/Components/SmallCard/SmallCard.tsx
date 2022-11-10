import { FC, useState } from 'react'
import cls from './SmallCard.module.css'
import { CardItemFilm } from '../../Interfaces/FilmsResponce'
import { Link } from 'react-router-dom'
import noimage from '../../Assets/img/noimage.png'
import Viewed from '../Buttons/Viewed'
import Favorite from '../Buttons/Favorite'

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
				<Favorite id={film.id} />
				<Viewed id={film.id} type={film.type} />
				{/* <div>
					<p onClick={setFavorite} className={isFavorite ? cls.favorite : ''}>
						{isFavorite ? 'Больше не интересно' : 'Добавить в избранное'}
					</p>
				</div>
				<div>
					<p onClick={setViewed} className={isViewed ? cls.viewed : ''}>
						{isViewed ? 'Уже смотрел' : 'Буду смотреть!'}
					</p>
				</div> */}
			</div>
		</div>
	)
}

export default SmallCard
