import { FC } from 'react'
import cls from './FullCard.module.css'
import { FilmResponce } from '../../Interfaces/Film'

interface AboutProps {
	film: FilmResponce
}

const About: FC<AboutProps> = ({ film }) => {
	return (
		<div className={cls.about}>
			<h2>О фильме:</h2>
			<div>
				<p>Год выхода:</p>
				<span>{film.year}</span>
			</div>
			<div>
				<p>Длительность:</p>
				<span>{film.movieLength} мин</span>
			</div>
			<div>
				<p>Страна производства:</p>
				<span>
					{film.countries.reduce((acc, el, i) => (acc += el.name + (i === film?.countries.length - 1 ? '' : ', ')), '')}
				</span>
			</div>
			<div>
				<p>Жанр:</p>
				<span>
					{film.genres.reduce((acc, el, i) => (acc += el.name + (i === film?.genres.length - 1 ? '' : ', ')), '')}
				</span>
			</div>
			<div>
				<p>Слоган:</p>
				<span>{film.slogan || 'Нет данных'}</span>
			</div>
			<div>
				<p>Бюджет:</p>
				<span>{film.budget?.value ? film.budget?.value + film.budget?.currency : 'Нет данных'}</span>
			</div>
			<div>
				<p>Сборы:</p>
				<span>
					{film.fees?.world?.value
						? `США: ${film.fees?.usa?.value}${film.fees?.usa?.currency} / 
        Мир: ${film.fees?.world?.value}${film.fees?.world?.currency}`
						: 'Нет данных'}
				</span>
			</div>
			<div>
				<p>Возрастной рейтинг:</p>
				<span>{film.ageRating}+</span>
			</div>
		</div>
	)
}

export default About
