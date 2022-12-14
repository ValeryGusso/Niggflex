import { FC, useState, useEffect } from 'react'
import { InView, useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Loader from '../../Components/Loader/Loader'
import SearchMenu from '../../Components/SearchMenu/SearchMenu'
import SmallCard from '../../Components/SmallCard/SmallCard'
import { fetchFilms, filmsSelector, ParamsType } from '../../Redux/Slices/films'
import { TypeDispatch } from '../../Redux/store'
import cls from './Filters.module.css'

const Filters: FC = () => {
	const dispatch = useDispatch<TypeDispatch>()
	const [showResult, setShowResult] = useState(false)
	const { data } = useSelector(filmsSelector)
	const { ref, entry } = useInView()
	const { data: films, loading, prevParams, curPage, pageLimit } = useSelector(filmsSelector)

	useEffect(() => {
		if (entry?.isIntersecting && films.length > 0 && !loading) {
			if (curPage <= pageLimit) {
				const params: ParamsType = { ...prevParams }
				params.page = curPage
				dispatch(fetchFilms(params))
			}
		}
	}, [entry])
	return (
		<div className={cls.container}>
			<div className={cls.search}>
				<SearchMenu show={setShowResult} />
			</div>
			<div className={cls.result}>
				{(showResult || data.length > 0) &&
					(data.length > 0 ? (
						<InView>
							{data.map((film, i) => (
								<SmallCard key={i} film={film} />
							))}
							{loading && (
								<div className={cls.loader}>
									<Loader />
								</div>
							)}
							<div ref={ref} className={cls.hidenLine}></div>
						</InView>
					) : (
						<div className={cls.placeholder}>
							{loading ? <Loader /> : <h2>По таким параметрам не ничего не нашлось :( попробуй другие фильтры</h2>}
						</div>
					))}
				{!showResult && data.length === 0 && (
					<div className={cls.placeholder}>
						<h2>Тут скоро что-то обязательно появится! Давай только немного настроим фильтры и запустим поиск...</h2>
					</div>
				)}
			</div>
		</div>
	)
}

export default Filters
