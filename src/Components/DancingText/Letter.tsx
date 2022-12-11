import classNames from 'classnames'
import { CSSProperties, FC, useState, useRef } from 'react'
import cls from './DancingText.module.css'

interface LetterProps {
	letter: string
}

interface Coords {
	x: number
	y: number
}

const Letter: FC<LetterProps> = ({ letter }) => {
	const [coordrs, setCoords] = useState<Coords>({ x: 0, y: 0 })
	const [active, setActive] = useState(false)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	function kick(): void {
		let x = Math.floor(Math.random() * 50) * (Math.random() > 0.5 ? 1 : -1)
		const y = Math.floor(Math.random() * 250)

		setCoords({ x, y })
	}

	function mouseOver() {
		if (timer.current) {
			return
		} else {
			kick()
			setActive(true)
			timer.current = setTimeout(() => {
				setActive(false)
				setCoords({ x: 0, y: 0 })
				timer.current = null
			}, 2200)
		}
	}

	return (
		<div
			className={classNames(cls.wrapper, active ? cls.active : '')}
			onMouseOver={mouseOver}
			style={
				{
					'--x': `${letter === 'I' ? coordrs.x + 10 : coordrs.x}px`,
					'--y': `${coordrs.y}px`,
					'--def': `${letter === 'I' ? '10px' : '0px'}`,
				} as CSSProperties
			}
		>
			<h1 className={classNames(cls.letter)}>{letter}</h1>
		</div>
	)
}

export default Letter
