import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ActorResponse } from '../../Interfaces/KPunofficial/actor'
import cls from './ActorBlock.module.css'

interface AboutProps {
	person: ActorResponse
}

const About: FC<AboutProps> = ({ person }) => {
	console.log(person.spouses)
	return (
		<div className={cls.about}>
			<h1>
				{person.nameRu} ({person.age})
			</h1>
			<h2>{person.nameEn}</h2>
			<div>
				<p>Пол:</p>
				<span>{person.sex === 'MALE' ? 'муж.' : 'жен.'}</span>
			</div>
			<div>
				<p>Годы жизни:</p>
				<span>
					{`${new Date(person.birthday).toLocaleDateString()} - `}
					{person.death ? ` ${new Date(person.death).toLocaleDateString()}` : 'в настоящее время жив'}
				</span>
			</div>
			<div>
				<p>Место рождения:</p>
				<span>{person.birthplace}</span>
			</div>
			<div>
				<p>Рост:</p>
				<span>{person.growth} см.</span>
			</div>
			<div>
				<p>Карьера:</p>
				<span>{person.profession}</span>
			</div>
			<div>
				<p>Супруга:</p>
				<span>
					{person.spouses.map(el => (
						<Link to={`/actor/${el.personId}`}>
							{el?.divorced || el.name} ({el.children > 0 ? `${el.children} детей` : 'детей нет'})
						</Link>
					))}
				</span>
			</div>
		</div>
	)
}

export default About
