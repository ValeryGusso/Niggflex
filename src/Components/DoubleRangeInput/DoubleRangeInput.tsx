import classNames from 'classnames'
import React, { FC, useState, useRef, useEffect, useCallback } from 'react'
import cls from './DoubleRangeInput.module.css'

interface Xmin extends React.CSSProperties {
	'--xmin': string
}

interface Xmax extends React.CSSProperties {
	'--xmax': string
}

const DoubleRangeInput: FC = () => {
	const fieldRef = useRef<HTMLDivElement>(null)
	const thumbMinRef = useRef<HTMLDivElement>(null)
	const thumbMaxRef = useRef<HTMLDivElement>(null)
	const [activeMin, setActiveMin] = useState(false)
	const [activeMax, setActiveMax] = useState(false)
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(150)

	useEffect(() => {
		if (fieldRef.current && thumbMaxRef.current) {
			const range = fieldRef.current.clientWidth - thumbMaxRef.current.clientWidth
			console.log(range)
			setMax(range)
		}

		console.log(thumbMinRef.current)
		document.addEventListener('pointerup', mouseUp)

		return () => document.removeEventListener('pointerup', mouseUp)
	}, [])

	const mouseMove = useCallback((e: MouseEvent) => {
    console.log(e.offsetX)
    // setMin(e.offsetX)

	}, [])

	function mouseDown() {
		fieldRef.current?.addEventListener('mousemove', mouseMove)
	}

	function mouseUp() {
		fieldRef.current?.removeEventListener('mousemove', mouseMove)
	}

	return (
		<div className={cls.container}>
			<div ref={fieldRef} className={cls.field}>
				<div
					style={{ '--xmin': `${min}px` } as Xmin}
					ref={thumbMinRef}
					onPointerDown={mouseDown}
					className={classNames(cls.min)}
				></div>
				<div
					ref={thumbMaxRef}
					style={{ '--xmax': max ? `${max}px` : 'Calc(100% - 3vmin)' } as Xmax}
					className={cls.max}
				></div>
			</div>
		</div>
	)
}

export default DoubleRangeInput
