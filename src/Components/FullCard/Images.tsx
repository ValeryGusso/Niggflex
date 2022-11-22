import { FC, useEffect, useState } from 'react'
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
			})
	}, [info.page])

	function openModal(i: number) {
		setCurrent(i)
		setShowModal(true)
	}

	function next() {
		if (current < images.length - 1) {
			setCurrent(prev => prev + 1)
			if (current === images.length - 2 && current !== info.total - 2) {
				const updated = { ...info }
				updated.page++
				setInfo(updated)
			}
		}
	}

	function prev() {
		if (current > 0) {
			setCurrent(prev => prev - 1)
		}
	}

	return (
		<div>
			<div className={cls.images}>
				{images &&
					images.length > 0 &&
					images.map((img, i) => <img onClick={() => openModal(i)} src={img.previewUrl} alt="image" key={i}></img>)}
			</div>
			{showModal && (
				<div className={cls.modal}>
					<div className={cls.left}>
						<img className={current === 0 ? cls.disabledL : ''} onClick={prev} src={arrow} alt="move left" />
					</div>
					<div className={cls.content}>
						<img className={cls.cur} onClick={() => setShowModal(false)} src={images[current].imageUrl} alt="image" />
						<h2>{`${current + 1} из ${info.total}`}</h2>
					</div>
					<div className={cls.right}>
						<img
							className={current === images.length - 1 ? cls.disabledR : ''}
							onClick={next}
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
