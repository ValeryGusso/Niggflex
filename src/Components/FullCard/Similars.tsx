import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import noimage from '../../Assets/img/noimage.png'
import axiosKPunofficial from '../../axios/KPunofficial'
import { SimilarsResponse } from '../../Interfaces/KPunofficial/similars'
import { cut } from '../../Utils/print'
import Loader from '../Loader/Loader'
import cls from './FullCard.module.css'

interface SimilarsProps {
	id: number
}
const Similars: FC<SimilarsProps> = ({ id }) => {
	const [similars, setSimilars] = useState<SimilarsResponse>({} as SimilarsResponse)
	const [loading, setLoading] = useState(true)
	const params = useParams()

	useEffect(() => {
		!loading && setLoading(true)
		axiosKPunofficial
			.get<SimilarsResponse>(`/v2.2/films/${id}/similars`)
			.then(res => {
				setSimilars(res.data)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [params.id])

	return (
		<div className={cls.similars}>
			{similars && similars.total > 0 && (
				<>
					{loading ? (
						<div className={cls.similarsLoader}>
							<Loader />
						</div>
					) : (
						<>
							<h2>Похожее кино ({similars.total}шт)</h2>
							<div>
								{similars.items.map(film => (
									<div className={cls.similar} key={film.filmId}>
										<img src={film.posterUrlPreview || film.posterUrl || noimage} alt="poster" />
										<Link to={`/film/${film.filmId}`}>
											<h2>{cut(film.nameRu || film.nameEn || film.nameOriginal, 22)}</h2>
										</Link>
									</div>
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}

export default Similars
