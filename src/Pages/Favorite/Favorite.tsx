import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axiosKPofficial from '../../axios/KPofficial'
import FaviriteItem from '../../Components/FavoriteItem/FavoriteItem'
import Loader from '../../Components/Loader/Loader'
import { FavoriteResponse } from '../../Interfaces/KPofficial/favorite'
import { authSelector } from '../../Redux/Slices/auth'
import { favoriteSelector, setFavoriteState, updateFavorite } from '../../Redux/Slices/favorite'
import cls from './Favorite.module.css'

const Favorite: FC = () => {
	const dispatch = useDispatch()
	const { favorite } = useSelector(authSelector)
	const { items, loading } = useSelector(favoriteSelector)

	useEffect(() => {
		const query: URL = new URL('https://api.kinopoisk.dev/movie')
		favorite.forEach(id => {
			query.searchParams.append('field', 'id')
			query.searchParams.append('search', id.toString())
		})
		query.searchParams.append('limit', '50')

		axiosKPofficial.get<FavoriteResponse>(query.toString()).then(res => {
			dispatch(updateFavorite(res.data.docs))
			dispatch(setFavoriteState({ pages: res.data.pages, total: res.data.total }))
		})
	}, [])

	return (
		// <div>
			<div className={cls.content}>
				{!loading && items.length > 0 ? (
					items.map(item => <FaviriteItem film={item} key={item.id}/>)
				) : (
					<div>
						<h2>К сожалению спосок избранного пуст...</h2>
					</div>
				)}
				{loading && (
					<div className={cls.loader}>
						<Loader />
					</div>
				)}
			</div>
		// </div>
	)
}

export default Favorite
