import { FC } from 'react'
import { Person } from '../../Interfaces/KPunofficial/staff'
import ActorsRow from './ActorsRow'
import cls from './FullCard.module.css'

interface ActorsProps {
	persons: Person[]
	type: 'group' | 'actors'
}

const Actors: FC<ActorsProps> = ({ persons, type }) => {
	return (
		<div className={cls.actors}>
			{type === 'group' && (
				<>
					<ActorsRow
						persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'director')}
						title="Режисёр"
					/>
					<ActorsRow
						persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'writer')}
						title="Сценарист"
					/>
					<ActorsRow
						persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'voice_director')}
						title="Звукорежисёр"
					/>
					<ActorsRow
						persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'operator')}
						title="Оператор"
					/>
					<ActorsRow
						persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'producer')}
						title="Продюссер"
					/>
					<ActorsRow persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'editor')} title="Редактор" />
					<ActorsRow
						persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'composer')}
						title="Композитор"
					/>
					<ActorsRow
						persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'translator')}
						title="Переводчик"
					/>
					<ActorsRow
						persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'designer')}
						title="Художник"
					/>
				</>
			)}
			{type === 'actors' && (
				<ActorsRow persons={persons.filter(pers => pers.professionKey.toLowerCase() === 'actor')} title="В ролях" />
			)}
		</div>
	)
}

export default Actors
