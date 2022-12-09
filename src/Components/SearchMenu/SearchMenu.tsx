import { Dispatch, FC, SetStateAction, useState } from 'react'
import { genres, GenresItem, searchTypes } from '../../Assets/constants'
import InputBlock from './InputBlock'
import close from '../../Assets/img/close.svg'
import cls from './SearchMenu.module.css'
import { TypeDispatch } from '../../Redux/store'
import { useDispatch } from 'react-redux'
import { clear, fetchFilms, filmsSelector, ParamsType, setParams } from '../../Redux/Slices/films'
import { useSelector } from 'react-redux'

interface SearchMenuProps {
	show: Dispatch<SetStateAction<boolean>>
}

interface ChangeResult {
	min: number
	max: number
	minValue: number
	maxValue: number
}

const SearchMenu: FC<SearchMenuProps> = ({ show }) => {
	const dispatch = useDispatch<TypeDispatch>()
	const { prevParams } = useSelector(filmsSelector)
	const [minRating, setMinRating] = useState(prevParams.ratingFrom || 1)
	const [maxRating, setMaxRating] = useState(prevParams.ratingTo || 10)
	const [minYear, setMinYear] = useState(prevParams.yearFrom || 1887)
	const [maxYear, setMaxYear] = useState(prevParams.yearTo || new Date().getFullYear())
	const [type, setType] = useState(getTypeNumber(prevParams.type) || 0)
	const [open, setOpen] = useState(false)
	const [list, setList] = useState<GenresItem[]>([])

	function getTypeNumber(value: string): number {
		searchTypes.forEach((el, i) => {
			if (el.value === value) {
				return i
			}
		})
		return 0
	}

	function add(genre: GenresItem) {
		if (list.length < 3) {
			const prev = [...list]
			const check = prev.find(el => el.id === genre.id)
			if (!check) {
				const updated = [...prev, genre]
				setList(updated)
			}
		}
	}

	function remove(genre: GenresItem) {
		if (!open) {
			return
		}
		const filtred = list.filter(el => el.id !== genre.id)
		setList(filtred)
	}

	function changeType() {
		if (type < searchTypes.length - 1) {
			setType(prev => prev + 1)
		} else {
			setType(0)
		}
	}

	function submit() {
		if (
			prevParams.type !== searchTypes[type].value ||
			prevParams.genres !== list[0]?.id ||
			prevParams.ratingFrom !== minRating ||
			prevParams.ratingTo !== maxRating ||
			prevParams.yearFrom !== minYear ||
			prevParams.yearTo !== maxYear
		) {
			dispatch(clear())
		}
		const params: ParamsType = {
			type: searchTypes[type].value,
			genres: list[0]?.id || null,
			ratingFrom: minRating,
			ratingTo: maxRating,
			yearFrom: minYear,
			yearTo: maxYear,
			order: 'RATING',
			page: 1,
		}

		dispatch(fetchFilms(params))
		dispatch(setParams(params))
		show(true)
	}

	return (
		<div className={cls.container}>
			<div className={cls.header}>
				Давай поищем что-то интересное среди <br /> <span onClick={changeType}>{searchTypes[type].title} :)</span>
			</div>
			<div className={cls.genre}>
				<div className={cls.genresList}>
					<p> Ищем среди:</p>
					<div
						onClick={() => setOpen(true)}
						style={{
							cursor: open ? 'default' : 'pointer',
							background: open ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
						}}
					>
						{list.map(el => (
							<p onClick={() => remove(el)} key={el.id}>
								{el.genre}
							</p>
						))}
					</div>
					{open && <img onClick={() => setOpen(false)} src={close} alt="close" />}
				</div>
				{open && (
					<div className={cls.allGenres}>
						{genres.map(el => (
							<p className={list.includes(el) ? cls.selected : ''} onClick={() => add(el)} key={el.id}>
								{el.genre}
							</p>
						))}
					</div>
				)}
			</div>
			<div onMouseEnter={() => open && setOpen(false)} className={cls.rating}>
				<InputBlock
					min={1}
					max={10}
					step={1}
					label={false}
					ruler={false}
					subSteps={false}
					title="По рейтингу:"
					style={{
						width: '300px',
						transform: 'translateX(-25%)',
						border: 'none',
						borderRadius: '2vmin',
						boxShadow: '0 0 15px rgba(255,255,255,0.25)',
						padding: '3vmin 2vmax',
					}}
					barLeftColor="#7f7f7f"
					barInnerColor="#5ffe7e"
					barRightColor="#7f7f7f"
					thumbLeftColor="#3f6afb"
					thumbRightColor="#3f6afb"
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
					style={{
						width: '300px',
						transform: 'translateX(-25%)',
						border: 'none',
						borderRadius: '2vmin',
						boxShadow: '0 0 15px rgba(255,255,255,0.25)',
						padding: '3vmin 2vmax',
					}}
					barLeftColor="#7f7f7f"
					barInnerColor="#5ffe7e"
					barRightColor="#7f7f7f"
					thumbLeftColor="#3f6afb"
					thumbRightColor="#3f6afb"
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
