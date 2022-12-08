import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Person } from '../../Interfaces/KPunofficial/staff'
import { printPostfix } from '../../Utils/print'
import cls from './FullCard.module.css'

interface ActorsRowProps {
	persons: Person[]
	title: string
}

const ActorsRow: FC<ActorsRowProps> = ({ persons, title }) => {
	return persons.length > 0 ? (
		<div>
			<h2>{title + (persons.length > 1 ? printPostfix(title) : '')}: </h2>
			<div className={cls.actorsBlock}>
				{persons.map(pers => (
					<div key={pers.staffId}>
						<Link to={'/actor/' + pers.staffId}>
							<img src={pers.posterUrl} alt="photo" />
						</Link>
						<h3>{pers.nameRu || pers.nameEn}</h3>
					</div>
				))}
			</div>
		</div>
	) : null
}

export default ActorsRow
