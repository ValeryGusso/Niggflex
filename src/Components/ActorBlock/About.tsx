import { FC } from 'react'
import { PersonResponse } from '../../Interfaces/Person'
import cls from './ActorBlock.module.css'

interface AboutProps {
	person: PersonResponse
}

const About: FC<AboutProps> = ({ person }) => {
	return (
		<div className={cls.about}>
			<h1>{person.name}</h1>
			<h2>{person.enName}</h2>
			<div>
				<p>Пол:</p>
				<span>{person.sex}</span>
			</div>
			<div>
				<p>Возраст:</p>
				<span>
					{person.age} лет ({new Date(person.birthday).toLocaleDateString()}
					{person.death && ' - ' + new Date(person.death).toLocaleDateString()})
				</span>
			</div>
			<div>
				<p>Место рождения:</p>
				<span>{person.birthPlace.map(el => el.value + ', ')}</span>
			</div>
			<div>
				<p>Рост:</p>
				<span>{person.growth} см.</span>
			</div>
			<div>
				<p>Карьера:</p>
				<span>{person.profession.map(prof => prof.value + ', ')}</span>
			</div>
			<div>
				<p>Супруга:</p>
				<span>{person.spouses.map(el => el.divorced || el.name)}</span>
			</div>
		</div>
	)
}

export default About
