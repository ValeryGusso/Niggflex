import axios from 'axios'
import { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { fakeImages } from '../../Assets/fakeImages'
import { Doc } from '../../Interfaces/Images'
import arrow from '../../Assets/img/arrow.svg'
import close from '../../Assets/img/close.svg'
import cls from './FullCard.module.css'

interface ImagesProps {
	id: number
}

const Images: FC<ImagesProps> = ({ id }) => {
	const leftRef = useRef(null)
	const rightRef = useRef(null)
	const [images, setImages] = useState([] as Doc[])
	const [current, setCurrent] = useState(0)
	const [showModal, setShowModal] = useState(false)

	// useEffect(() => {
	// 	document.addEventListener('keydown', keydown)

	// 	const query = new URL('https://api.kinopoisk.dev/image')

	// 	query.searchParams.append('field', 'movieId')
	// 	query.searchParams.append('search', `${id}`)
	//   query.searchParams.append('field', 'type')
	// 	query.searchParams.append('search', `frame`)
	// 	query.searchParams.append('limit', '50')
	// 	query.searchParams.append('token', '4KCTKW4-FNN45QN-NZFVTWV-XW8D358')

	// 	axios.get(query.toString()).then(res => {
	// 		setImages(res.data.docs)
	// 		console.log(JSON.stringify(res.data))
	// 	})

	// 	return () => {
	// 		document.removeEventListener('keydown', keydown)
	// 	}
	// }, [])

	// const keydown = useCallback((e: KeyboardEvent) => {
	// 	// console.log(e)
	// 	if (e.keyCode === 37) {
	// 		if (current > 0) {
	// 			setCurrent(prev => prev - 1)
	// 			console.log('Keydown: ', current)
	// 		}
	// 	}
	// 	if (e.keyCode === 39) {
	// 		if (current < images.length - 1) {
	// 			setCurrent(prev => prev + 1)
	// 			console.log('Keydown: ', current)
	// 		}
	// 	}
	// }, [])

	useEffect(() => {
		setImages(fakeImages.docs)
	}, [])

	// useEffect(() => {
	// 	if (showModal) {
	// 		document.addEventListener('keydown', keydown)
	// 	} else {
	// 		document.removeEventListener('keydown', keydown)
	// 	}
	// }, [showModal])

	function openModal(i: number) {
		setCurrent(i)
		setShowModal(true)
	}

	function next() {
		if (current < images.length - 1) {
			setCurrent(prev => prev + 1)
			// console.log('Click: ', current)
		}
	}

	function prev() {
		if (current > 0) {
			setCurrent(prev => prev - 1)
			// console.log('Click: ', current)
		}
	}

	// const next = useCallback(() => {
	// 	if (current < images.length - 1) {
	// 		setCurrent(prev => prev + 1)
	// 		console.log('Click: ', current)
	// 	}
	// }, [showModal])

	// const prev = useCallback(() => {
	// 	if (current > 0) {
	// 		setCurrent(prev => prev - 1)
	// 		console.log('Click: ', current)
	// 	}
	// }, [showModal])

	return (
		<div>
			<div className={cls.images}>
				{images &&
					images.length > 0 &&
					images.map((img, i) => (
						<img ref={leftRef} onClick={() => openModal(i)} src={img.previewUrl} alt="image" key={img.url}></img>
					))}
			</div>
			{showModal && (
				<div className={cls.modal}>
					<div className={cls.left}>
						<img className={current === 0 ? cls.disabledL : ''} onClick={prev} src={arrow} alt="move left" />
					</div>
					<div className={cls.content}>
						{/* <img className={cls.prev} onClick={() => setShowModal(false)} src={images[current - 1].url} alt="image" /> */}
						<img className={cls.cur} onClick={() => setShowModal(false)} src={images[current].url} alt="image" />
						{/* <img className={cls.next} onClick={() => setShowModal(false)} src={images[current + 1].url} alt="image" /> */}
						<h2>{`${current + 1} из ${images.length}`}</h2>
					</div>
					<div className={cls.right}>
						<img
							ref={rightRef}
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
