import { CSSProperties, FC, HTMLAttributes } from 'react'
import cls from './DancingText.module.css'
import Letter from './Letter'

interface DancingTextProps {
	text: string
}

const DancingText: FC<DancingTextProps> = ({ text }) => {
	return (
		<div className={cls.container}>
			{text.split('').map((letter, i) => (
				<div>
					<Letter letter={letter} key={i} />
				</div>
			))}
		</div>
	)
}

export default DancingText
