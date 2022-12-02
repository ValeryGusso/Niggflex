import { FC, useEffect, useState, useRef } from 'react'
import { InView, useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { reviewsColors } from '../../Assets/constants'
import axiosKPunofficial from '../../axios/KPunofficial'
import { Item, ReviewsResponse } from '../../Interfaces/KPunofficial/reviews'
import {
	clearReviews,
	fetchReviews,
	reviewsSelector,
	setReviewsState,
	SetReviewsStatePayload,
	updateReviews,
} from '../../Redux/Slices/reviews'
import { TypeDispatch } from '../../Redux/store'
import Loader from '../Loader/Loader'
import cls from './FullCard.module.css'
import Review from './Review'

interface ReviewsProps {
	id: number
}

interface SelectState {
	sort: boolean
	view: boolean
}

interface Options {
	page: number
}

interface TypeItem {
	title: string
	value: string
}
const reviewsSortTypes: TypeItem[] = [
	{ title: 'дате (по возр.)', value: 'DATE_DESC' },
	{ title: 'дате (по убыв.)', value: 'DATE_ASC' },
	{ title: 'рейтингу (по возр.)', value: 'USER_NEGATIVE_RATING_DESC' },
	{ title: 'рейтингу (по убыв.)', value: 'USER_POSITIVE_RATING_DESC' },
]

const reviewesTypes: TypeItem[] = [
	{ title: 'только положительные', value: 'POSITIVE' },
	{ title: 'только нейтральные', value: 'NEUTRAL' },
	{ title: 'только отрицательные', value: 'NEGATIVE' },
	{ title: 'все', value: '' },
]

const Reviews: FC<ReviewsProps> = ({ id }) => {
	const params = useParams()
	const dispatch = useDispatch<TypeDispatch>()
	const { reviews, loading, totalItems, totalPositive, totalNeutral, totalNegative, page, totalPages } =
		useSelector(reviewsSelector)
	const [sortType, setSortType] = useState<TypeItem>({ title: 'дате (по возр.)', value: 'DATE_ASC' })
	const [viewType, setViewType] = useState<TypeItem>({ title: 'все', value: '' })
	const [select, setSelect] = useState<SelectState>({ sort: false, view: false })
	const isFirstRender = useRef<boolean>(false)
	const [viewCount, setViewCount] = useState(0)
	const { ref, entry } = useInView()

	useEffect(() => {
		dispatch(clearReviews())
		axiosKPunofficial.get<ReviewsResponse>(`/v2.2/films/${id}/reviews`).then(res => {
			dispatch(updateReviews(res.data.items))
			dispatch(
				setReviewsState({
					total: res.data.total,
					totalPositive: res.data.totalPositiveReviews,
					totalNeutral: res.data.totalNeutralReviews,
					totalNegative: res.data.totalNegativeReviews,
					totalPages: res.data.totalPages,
				} as SetReviewsStatePayload)
			)
		})

		return () => {
			dispatch(clearReviews())
		}
	}, [params.id])

	useEffect(() => {
		if (entry?.isIntersecting && reviews?.length > 0) {
			if (page <= totalPages) {
				// console.log(123)
				dispatch(fetchReviews({ id: params?.id ? +params.id : 0, page, sort: sortType.value }))
			}
		}
	}, [entry])

	useEffect(() => {
		if (!isFirstRender.current) {
			isFirstRender.current = true
		} else {
			dispatch(clearReviews())
			dispatch(fetchReviews({ id: params?.id ? +params.id : 0, page: 1, sort: sortType.value }))
		}
	}, [sortType])

	useEffect(() => {
		if (viewType.value) {
			let counter = 0
			reviews.forEach(el => el.type === viewType.value && counter++)
			setViewCount(counter)
		} else {
			setViewCount(reviews.length)
		}
	}, [viewType, reviews.length])

	function filtr(type: string): Item[] {
		const filtred = reviews.filter(el => el.type.includes(type))
		return filtred
	}

	function show(type: string): void {
		const state = { ...select }

		switch (type) {
			case 'view':
				state.view = !state.view
				setSelect(state)
				break
			case 'sort':
				state.sort = !state.sort
				setSelect(state)
				break
		}
	}

	return (
		<div className={cls.reviews}>
			{loading && reviews?.length === 0 ? (
				<div className={cls.reviewsLoader}>
					<h1>Пользовательские рецензии загружаются...</h1>
					<Loader />
				</div>
			) : (
				<div className={cls.reviewsContent}>
					<div>
						<h2>
							Загруженно {reviews.length} из {totalItems} рецензий (всего: <span>{totalPositive}</span>,
							<span> {totalNeutral}</span>, <span>{totalNegative}</span>)
						</h2>
						<h3>
							Показывать{' '}
							<span onClick={() => show('view')}>
								{viewType.title}({viewCount})
							</span>
							{select.view && (
								<ul onMouseLeave={() => show('view')} className={select.view ? cls.open : cls.hide}>
									{reviewesTypes.map((el, i) => (
										<li onClick={() => setViewType(el)} key={el.title} style={{ background: reviewsColors[i] }}>
											{el.title}
										</li>
									))}
								</ul>
							)}
						</h3>
						<h3>
							Сортировка по <span onClick={() => show('sort')}>{sortType.title}</span>
							{select.sort && (
								<ul onMouseLeave={() => show('sort')} className={select.sort ? cls.open : cls.hide}>
									{reviewsSortTypes.map(el => (
										<li onClick={() => setSortType(el)} key={el.value}>
											{el.title}
										</li>
									))}
								</ul>
							)}
						</h3>
					</div>
					<div>
						<InView>
							{reviews?.length > 0 ? (
								viewCount > 0 ? (
									filtr(viewType.value).map(review => <Review review={review} key={review.kinopoiskId} />)
								) : (
									<h1>К сожалению, не найдено ничего удовлетворяющего текущим фильтрам :( попробуй что-то другое</h1>
								)
							) : (
								<h1>К сожалению, никаких рецензий не обнаружено :(</h1>
							)}
							{reviews.length >= 20 && <div ref={ref} className={cls.hiddenLine}></div>}
							{loading && (
								<div className={cls.reviewsInnerLoader}>
									<Loader />
								</div>
							)}
						</InView>
					</div>
				</div>
			)}
		</div>
	)
}

export default Reviews
