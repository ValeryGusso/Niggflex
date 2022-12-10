import { FC, useEffect, useState, useCallback, useRef, TouchEventHandler } from 'react'
import arrow from '../../Assets/img/arrow.svg'
import close from '../../Assets/img/close.svg'
import cls from './FullCard.module.css'
import axiosKPunofficial from '../../axios/KPunofficial'
import { Image, ImagesResponse } from '../../Interfaces/KPunofficial/images'

interface ImagesProps {
	id: number
}

interface Info {
	total: number
	page: number
	totalPages: number
}

const Images: FC<ImagesProps> = ({ id }) => {
	const [images, setImages] = useState([] as Image[])
	const [current, setCurrent] = useState(0)
	const selected = useRef(0)
	const max = useRef(0)
	const limit = useRef(0)
	const [showModal, setShowModal] = useState(false)
	const [info, setInfo] = useState({ total: 0, page: 1, totalPages: 1 } as Info)

	useEffect(() => {
		axiosKPunofficial
			.get<ImagesResponse>(`/v2.2/films/${id}/images`, {
				params: {
					type: 'STILL',
					page: info.page,
				},
			})
			.then(res => {
				const imgs: Image[] = images.length > 0 ? [...images, ...res.data.items] : [...res.data.items]
				setImages(imgs)

				const updated = { ...info }
				updated.total = res.data.total
				updated.totalPages = res.data.totalPages
				setInfo(updated)
				max.current = res.data.total
				limit.current += res.data.items.length
			})
	}, [info.page])

	function openModal(i: number) {
		setCurrent(i)
		selected.current = i
		setShowModal(true)
	}

	function next(i: number) {
		if (i < max.current - 1) {
			setCurrent(prev => prev + 1)
			selected.current++
			if (selected.current === limit.current - 2 && selected.current !== max.current - 2) {
				const updated: Info = {
					page: Math.ceil(selected.current / 20) + 1,
					total: max.current,
					totalPages: Math.ceil(max.current / 20),
				}
				setInfo(updated)
			}
		}
	}

	function prev(i: number) {
		if (i > 0) {
			setCurrent(prev => prev - 1)
			selected.current--
		}
	}

	let xDown: number | null = null
	let yDown: number | null = null

	function touchStart(e: React.TouchEvent<HTMLDivElement>): void {
		const firstTouch = e.touches[0]
		xDown = firstTouch.clientX
		yDown = firstTouch.clientY
	}

	function touchMove(e: React.TouchEvent<HTMLDivElement>): void {
		if (!xDown || !yDown) {
			return
		}

		const xUp = e.touches[0].clientX
		const yUp = e.touches[0].clientY

		const xDiff = xDown - xUp
		const yDiff = yDown - yUp

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) {
				next(current)
			} else {
				prev(current)
			}
		}

		xDown = null
		yDown = null
	}

	return (
		<div onTouchStart={touchStart} onTouchMove={touchMove}>
			<div className={cls.images}>
				{images &&
					images.length > 0 &&
					images.map((img, i) => <img onClick={() => openModal(i)} src={img.previewUrl} alt="image" key={i}></img>)}
			</div>
			{showModal && (
				<div className={cls.modal}>
					<div className={cls.left}>
						<img
							className={current === 0 ? cls.disabledL : ''}
							onClick={() => prev(selected.current)}
							src={arrow}
							alt="move left"
						/>
					</div>
					<div className={cls.content}>
						<img className={cls.cur} onClick={() => setShowModal(false)} src={images[current].imageUrl} alt="image" />
						<h2>{`${current + 1} из ${info.total}`}</h2>
					</div>
					<div className={cls.right}>
						<img
							className={current === images.length - 1 ? cls.disabledR : ''}
							onClick={() => next(selected.current)}
							src={arrow}
							alt="move right"
						/>
					</div>
					<div className={cls.close}>
						<img onClick={() => setShowModal(false)} src={close} alt="close" />
					</div>
				</div>
			)}
		</div>
	)
}

export default Images
