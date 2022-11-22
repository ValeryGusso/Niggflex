import { FC, useEffect, useState } from 'react'
import cls from './FullCard.module.css'
import axiosKPunofficial from '../../axios/KPunofficial'
import { Fees, FeesResponse } from '../../Interfaces/KPunofficial/fees'
import { useParams } from 'react-router'
import { FilmResponse } from '../../Interfaces/KPunofficial/film'

interface AboutProps {
	film: FilmResponse
}

const About: FC<AboutProps> = ({ film }) => {
	const params = useParams()
	const [fees, setFees] = useState<Fees[] | null>(null)

	useEffect(() => {
		axiosKPunofficial.get<FeesResponse>(`/v2.2/films/${params.id}/box_office`).then(res => {
			setFees(res.data.items)
		})
	}, [])

	function printFees(fees: Fees[]): string {
		const result: string[] = []
		fees.forEach(el => {
			if (el.type !== 'BUDGET') {
				let country
				switch (el.type) {
					case 'USA':
						country = 'США'
						break
					case 'RUS':
						country = 'Россия'
						break
					case 'WORLD':
						country = 'Мир'
						break
					default:
						country = 'Где-то'
				}
				result.push(`${country}: ${el.amount} ${el.symbol}`)
			}
		})
		return result.join(' / ')
	}

	return (
		<div className={cls.about}>
			<h2>О фильме:</h2>
			<div>
				<p>Год выхода:</p>
				<span>{film.year}</span>
			</div>
			<div>
				<p>Длительность:</p>
				<span>{film.filmLength ? film.filmLength + 'мин' : 'Нет данных'} </span>
			</div>
			<div>
				<p>Страна производства:</p>
				<span>
					{film.countries.reduce(
						(acc, el, i) => (acc += el.country + (i === film?.countries.length - 1 ? '' : ', ')),
						''
					)}
				</span>
			</div>
			<div>
				<p>Жанр:</p>
				<span>
					{film.genres.reduce((acc, el, i) => (acc += el.genre + (i === film?.genres.length - 1 ? '' : ', ')), '')}
				</span>
			</div>
			<div>
				<p>Слоган:</p>
				<span>{film.slogan || 'Нет данных'}</span>
			</div>
			<div>
				<p>Бюджет:</p>
				{fees && fees.length > 0 ? (
					<span>
						{fees.map(el => el.type === 'BUDGET' && (el.amount ? `${el.amount} ${el.symbol}` : 'Нет данных'))}
					</span>
				) : (
					<span>Нет данных</span>
				)}
			</div>
			<div>
				<p>Сборы:</p>
				{fees && fees.length > 0 ? <span>{printFees(fees)}</span> : <span>Нет данных</span>}
			</div>
			<div>
				<p>Возрастной рейтинг:</p>
				<span>{film.ratingAgeLimits ? film.ratingAgeLimits.match(/\d/g)?.join('') + '+' : 'Нет данных'}</span>
			</div>
		</div>
	)
}

export default About
