import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Person } from '../../Interfaces/Film'
import cls from './FullCard.module.css'

interface ActorsProps {
	persons: Person[]
	type: 'group' | 'actors'
}

const Actors: FC<ActorsProps> = ({ persons, type }) => {
	const director = persons.filter(pers => pers.enProfession === 'director')
	const producer = persons.filter(pers => pers.enProfession === 'producer')
	const editor = persons.filter(pers => pers.enProfession === 'editor')
	const operator = persons.filter(pers => pers.enProfession === 'operator')
	const writer = persons.filter(pers => pers.enProfession === 'writer')
	const composer = persons.filter(pers => pers.enProfession === 'composer')
	const designer = persons.filter(pers => pers.enProfession === 'designer')
	const actor = persons.filter(pers => pers.enProfession === 'actor')

	return (
		<div className={cls.actors}>
			{type === 'group' && (
				<>
					<div>
						<h2>Режиссёр{director.length > 1 && 'ы'}: </h2>
						<div className={cls.actorsBlock}>
							{director.map(pers => (
								<div key={pers.id}>
									<Link to={'/actor/' + pers.id}>
										<img src={pers.photo} alt="photo" />
									</Link>
									<h3>{pers.name || pers.enName}</h3>
								</div>
							))}
						</div>
					</div>
					<div>
						<h2>Сценарист{writer.length > 1 && 'ы'}: </h2>
						<div className={cls.actorsBlock}>
							{writer.map(pers => (
								<div key={pers.id}>
									<Link to={'/actor/' + pers.id}>
										<img src={pers.photo} alt="photo" />
									</Link>
									<h3>{pers.name || pers.enName}</h3>
								</div>
							))}
						</div>
					</div>
					<div>
						<h2>Оператор{operator.length > 1 && 'ы'}: </h2>
						<div className={cls.actorsBlock}>
							{operator.map(pers => (
								<div key={pers.id}>
									<Link to={'/actor/' + pers.id}>
										<img src={pers.photo} alt="photo" />
									</Link>
									<h3>{pers.name || pers.enName}</h3>
								</div>
							))}
						</div>
					</div>
					<div>
						<h2>Продюссер{producer.length > 1 && 'ы'}: </h2>
						<div className={cls.actorsBlock}>
							{producer.map(pers => (
								<div key={pers.id}>
									<Link to={'/actor/' + pers.id}>
										<img src={pers.photo} alt="photo" />
									</Link>
									<h3>{pers.name || pers.enName}</h3>
								</div>
							))}
						</div>
					</div>
					<div>
						<h2>Редактор{editor.length > 1 && 'ы'}: </h2>
						<div className={cls.actorsBlock}>
							{editor.map(pers => (
								<div key={pers.id}>
									<Link to={'/actor/' + pers.id}>
										<img src={pers.photo} alt="photo" />
									</Link>
									<h3>{pers.name || pers.enName}</h3>
								</div>
							))}
						</div>
					</div>
					<div>
						<h2>Композитор{composer.length > 1 && 'ы'}: </h2>
						<div className={cls.actorsBlock}>
							{composer.map(pers => (
								<div key={pers.id}>
									<Link to={'/actor/' + pers.id}>
										<img src={pers.photo} alt="photo" />
									</Link>
									<h3>{pers.name || pers.enName}</h3>
								</div>
							))}
						</div>
					</div>
					<div>
						<h2>
							Художник{designer.length > 1 && 'и'}-постановщик{designer.length > 1 && 'и'}:{' '}
						</h2>
						<div className={cls.actorsBlock}>
							{designer.map(pers => (
								<div key={pers.id}>
									<Link to={'/actor/' + pers.id}>
										<img src={pers.photo} alt="photo" />
									</Link>
									<h3>{pers.name || pers.enName}</h3>
								</div>
							))}
						</div>
					</div>
				</>
			)}
			{type === 'actors' && (
				<div>
					<h2>В ролях: </h2>
					<div className={cls.actorsBlock}>
						{actor.map(pers => (
							<div key={pers.id}>
								<Link to={'/actor/' + pers.id}>
									<img src={pers.photo} alt="photo" />
								</Link>
								<h3>{pers.name || pers.enName}</h3>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Actors
