import { FC, useEffect, useState } from 'react'
import axiosKPunofficial from '../../axios/KPunofficial'
import CardItemPremieres from '../../Components/CardItem/CardItemPremieres'
import Loader from '../../Components/Loader/Loader'
import { Film, PremieresResponse } from '../../Interfaces/KPunofficial/premieres'
import { months, monthsForPrint } from '../../Assets/constants'
import cls from './Premieres.module.css'
import classNames from 'classnames'

interface SearchState {
	year: number
	month: number
}

interface ShowState {
	year: boolean
	month: boolean
}

const Premieres: FC = () => {
	const [films, setFilms] = useState<Film[]>([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState<SearchState>({ year: new Date().getFullYear(), month: new Date().getMonth() })
	const [show, setShow] = useState<ShowState>({ year: false, month: false })

	useEffect(() => {
		setLoading(true)
		axiosKPunofficial
			.get<PremieresResponse>('/v2.2/films/premieres', {
				params: {
					year: search.year,
					month: months[search.month],
				},
			})
			.then(res => {
				setFilms(res.data.items)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [search])

	function createYears(): number[] {
		const result: number[] = []
		const curDate = new Date().getFullYear()

		for (let i = 0; i < 12; i++) {
			result.push(curDate - i)
		}

		return result
	}

	function changeSearch(type: string, value: number): void {
		if (type === 'year' && value !== search.year) {
			setSearch(prev => ({ ...prev, year: value }))
			setShow(prev => ({ ...prev, year: false }))
		}
		if (type === 'month' && value <= new Date().getMonth() && value !== search.month) {
			setSearch(prev => ({ ...prev, month: value }))
			setShow(prev => ({ ...prev, month: false }))
		}
	}

	return (
		<div className={cls.container}>
			{loading ? (
				<h1>Идёт загрузка...</h1>
			) : (
				<h1>
					Премьеры{' '}
					<span>
						<span onClick={() => setShow(prev => ({ ...prev, month: true }))}>{monthsForPrint[search.month]}</span>
						{show.month && (
							<ul
								onMouseLeave={() => setShow(prev => ({ ...prev, month: false }))}
								className={show.month ? cls.show : cls.hide}
							>
								{monthsForPrint.map((el, i) => (
									<li
										onClick={() => changeSearch('month', i)}
										key={el}
										className={classNames(
											i > new Date().getMonth() && search.year === new Date().getFullYear() ? cls.disabled : '',
											i === search.month ? cls.active : ''
										)}
									>
										{el}
									</li>
								))}
							</ul>
						)}
					</span>{' '}
					<span>
						<span onClick={() => setShow(prev => ({ ...prev, year: true }))}>{search.year}.</span>
						{show.year && (
							<ul
								onMouseLeave={() => setShow(prev => ({ ...prev, year: false }))}
								className={show.year ? cls.show : cls.hide}
							>
								{createYears().map(el => (
									<li
										className={el === search.year ? cls.active : ''}
										onClick={() => changeSearch('year', el)}
										key={el}
									>
										{el}
									</li>
								))}
							</ul>
						)}
					</span>{' '}
					Что будем смотреть?
				</h1>
			)}
			<div>
				{loading ? (
					<div className={cls.loader}>
						<Loader />
					</div>
				) : (
					films.length > 0 && films.map(film => <CardItemPremieres key={film.kinopoiskId} film={film} />)
				)}
			</div>
		</div>
	)
}

export default Premieres
