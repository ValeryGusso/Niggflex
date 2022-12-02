import { FC } from 'react'
import { Film as FilmItem } from '../../Interfaces/KPofficial/films'
import noimage from '../../Assets/img/noimage.png'
import cls from './ActorBlock.module.css'
import { cut } from '../../Utils/print'
import { Link } from 'react-router-dom'

interface FilmProps {
	film: FilmItem
}

const Film: FC<FilmProps> = ({ film }) => {
	return (
		<Link className={cls.film} to={`/film/${film.id}`}>
			<img src={film?.poster?.previewUrl || film?.poster?.url || noimage} alt="poster" />
			<h1>
				{cut(film.name || film.alternativeName, 25)} ({film.year})
			</h1>
		</Link>
	)
}

export default Film
