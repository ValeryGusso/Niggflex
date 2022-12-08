import { FC } from 'react'
import cls from './DancingText.module.css'
import Letter from './Letter'

interface DancingTextProps {
	text: string
}

const DancingText: FC<DancingTextProps> = ({ text }) => {
	return (
		<div className={cls.container}>
			{text.split('').map((letter, i) => (
				<div key={i}>
					<Letter letter={letter} />
				</div>
			))}
		</div>
	)
}

export default DancingText
