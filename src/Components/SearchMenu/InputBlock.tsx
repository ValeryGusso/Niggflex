import { Dispatch, FC, SetStateAction, useState } from 'react'
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react'
import cls from './SearchMenu.module.css'

interface InputBlockProps {
	min: number
	max: number
	step: number
	minValue: number
	maxValue: number
	baseClassName?: string
	className?: string
	title: string
	style?: React.CSSProperties
	ruler?: boolean | string
	label?: boolean | string
	subSteps?: boolean
	stepOnly?: boolean
	preventWheel?: boolean | string
	labels?: string[]
	minCaption?: string
	maxCaption?: string
	barLeftColor?: string
	barRightColor?: string
	barInnerColor?: string
	thumbLeftColor?: string
	thumbRightColor?: string
	setMin: Dispatch<SetStateAction<number>>
	setMax: Dispatch<SetStateAction<number>>
	onInput?: (e: ChangeResult) => void
	onChange?: (e: ChangeResult) => void
}

const InputBlock: FC<InputBlockProps> = props => {
	function changeMin(e: React.ChangeEvent<HTMLInputElement>) {
		if (+e.target.value >= props.min && +e.target.value <= props.maxValue) {
			props.setMin(+e.target.value)
		}
	}

	function changeMax(e: React.ChangeEvent<HTMLInputElement>) {
		if (+e.target.value <= props.max && +e.target.value >= props.minValue) {
			props.setMax(+e.target.value)
		}
	}

	return (
		<>
			<div className={cls.inputs}>
				<h1>{props.title}</h1>
				<div className={cls.block}>
					<p>От:</p>
					<input onChange={changeMin} type="number" min={props.min} max={props.max} value={props.minValue} />
				</div>
				<div className={cls.block}>
					<p>До:</p>
					<input onChange={changeMax} type="number" min={props.min} max={props.max} value={props.maxValue} />
				</div>
			</div>
			<MultiRangeSlider {...props} />
		</>
	)
}

export default InputBlock
