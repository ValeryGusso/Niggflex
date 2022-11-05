import { Dispatch, FC, SetStateAction, useState } from 'react'
import { genresList } from '../../Assets/constants'
import InputBlock from './InputBlock'
import close from '../../Assets/img/close.svg'
import cls from './SearchMenu.module.css'
import { TypeDispatch } from '../../Redux/store'
import { useDispatch } from 'react-redux'
import { clear, fetchFilms } from '../../Redux/Slices/films'

interface SearchMenuProps {
	show: Dispatch<SetStateAction<boolean>>
}

interface ChangeResult {
	min: number
	max: number
	minValue: number
	maxValue: number
}

type typeState = 'фильмов' | 'сериалов'

const SearchMenu: FC<SearchMenuProps> = ({ show }) => {
	const dispatch = useDispatch<TypeDispatch>()
	const [minRating, setMinRating] = useState(1)
	const [maxRating, setMaxRating] = useState(10)
	const [minYear, setMinYear] = useState(1887)
	const [maxYear, setMaxYear] = useState(new Date().getFullYear())
	const [type, setType] = useState<typeState>('фильмов')
	const [open, setOpen] = useState(false)
	const [list, setList] = useState<string[]>([])

	function add(genre: string) {
		if (!list.includes(genre) && list.length < 3) {
			setList(prev => [...prev, genre])
		}
	}

	function remove(genre: string) {
		if (!open) {
			return
		}
		const filtred = list.filter(el => el !== genre)
		setList(filtred)
	}

	function changeType() {
		if (type === 'сериалов') {
			setType('фильмов')
		} else {
			setType('сериалов')
		}
	}

	function submit() {
		dispatch(clear())
		// const query = new URL(`https://api.kinopoisk.dev/movie/`)
		// query.searchParams.append('field', 'typeNumber')
		// query.searchParams.append('search', type === 'фильмов' ? '1' : '2')
		// list.forEach(genre => {
		// 	query.searchParams.append('field', 'genres.name')
		// 	query.searchParams.append('search', genre)
		// })
		// query.searchParams.append('field', 'rating.kp')
		// query.searchParams.append('search', `${minRating}-${maxRating}`)
		// query.searchParams.append('field', 'year')
		// query.searchParams.append('search', `${minYear}-${maxYear}`)
		// query.searchParams.append('limit', '20')
		// query.searchParams.append('token', '4KCTKW4-FNN45QN-NZFVTWV-XW8D358')

		// console.log(query.toString())

		// dispatch(fetchFilms(query))
		show(true)
	}

	return (
		<div className={cls.container}>
			<div className={cls.header}>
				Давай поищем что-то интересное среди <span onClick={changeType}>{type} :)</span>
			</div>
			<div className={cls.genre}>
				<div className={cls.genresList}>
					<p> Ищем среди:</p>
					<div onClick={() => setOpen(true)} style={{ cursor: open ? 'default' : 'pointer' }}>
						{list.map(el => (
							<p onClick={() => remove(el)} key={el}>
								{el}
							</p>
						))}
					</div>
					{open && <img onClick={() => setOpen(false)} src={close} alt="close" />}
				</div>
				{open && (
					<div className={cls.allGenres}>
						{genresList.map(el => (
							<p className={list.includes(el) ? cls.selected : ''} onClick={() => add(el)} key={el}>
								{el}
							</p>
						))}
					</div>
				)}
			</div>
			<div className={cls.rating}>
				<InputBlock
					min={1}
					max={10}
					step={1}
					label={false}
					ruler={false}
					subSteps={false}
					title="По рейтингу:"
					style={{ border: 'none' }}
					barLeftColor="#ff5643"
					barInnerColor="#47ff91"
					barRightColor="#ff5643"
					thumbLeftColor="#74cfff"
					thumbRightColor="#74cfff"
					minValue={minRating}
					maxValue={maxRating}
					setMin={setMinRating}
					setMax={setMaxRating}
					onInput={(e: ChangeResult) => {
						setMinRating(e.minValue)
						setMaxRating(e.maxValue)
					}}
				/>
			</div>
			<div className={cls.year}>
				<InputBlock
					min={1887}
					max={new Date().getFullYear()}
					step={1}
					label={false}
					ruler={false}
					title="По году премьеры:"
					style={{ border: 'none' }}
					barLeftColor="#ff5643"
					barInnerColor="#47ff91"
					barRightColor="#ff5643"
					thumbLeftColor="#74cfff"
					thumbRightColor="#74cfff"
					minValue={minYear}
					maxValue={maxYear}
					setMin={setMinYear}
					setMax={setMaxYear}
					onInput={(e: ChangeResult) => {
						setMinYear(e.minValue)
						setMaxYear(e.maxValue)
					}}
				/>
			</div>
			<button onClick={submit}>Найти!</button>
		</div>
	)
}

export default SearchMenu
