import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { fakeFilms } from '../../Assets/fakeFilms'
import SearchMenu from '../../Components/SearchMenu/SearchMenu'
import SmallCard from '../../Components/SmallCard/SmallCard'
import { filmsSelector } from '../../Redux/Slices/films'
import cls from './Home.module.css'

const Home: FC = () => {
	const [showResult, setShowResult] = useState(false)
	// const { data } = useSelector(filmsSelector)
	const data = fakeFilms
	return (
		<div className={cls.container}>
			<SearchMenu show={setShowResult} />
			<div className={cls.result}>
				{showResult &&
					(data.length > 0 ? (
						data.map(film => <SmallCard key={film.id} film={film} />)
					) : (
						<div className={cls.placeholder}>
							<h2>По таким параметрам не ничего не нашлось :( попробуй другие фильтры</h2>
						</div>
					))}
				{!showResult && (
					<div className={cls.placeholder}>
						<h2>Тут скоро что-то обязательно появится! Давай только немного настроим фильтры и запустим поиск...</h2>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
