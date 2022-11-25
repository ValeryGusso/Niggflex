import { FC } from 'react'
import { Doc } from '../../Interfaces/KPofficial/search'
import cls from './Novelty.module.css'

interface PosterProps {
	film: Doc
}

const Poster: FC<PosterProps> = ({ film }) => {
	console.log(film)
	return <div className={cls.poster}></div>
}

export default Poster
