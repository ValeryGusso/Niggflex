import { FC } from 'react'
import Favorite from '../Buttons/Favorite'
import Viewed from '../Buttons/Viewed'
import cls from './Search.module.css'

interface ImageProps {
	url: string
	id?: number
	type?: string
	hide: React.Dispatch<React.SetStateAction<boolean>>
}

const Image: FC<ImageProps> = ({ url, id, type, hide }) => {
	return (
		<div onMouseLeave={() => hide(false)} className={cls.image}>
			<img src={url} alt="poster" />
			{/* <div className={cls.buttons}>
				<Favorite id={123} />
				<Viewed id={123} type="" />
			</div> */}
		</div>
	)
}

export default Image
