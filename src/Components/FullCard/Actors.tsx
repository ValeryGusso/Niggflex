import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Person } from '../../Interfaces/KPunofficial/staff'
import cls from './FullCard.module.css'

interface ActorsProps {
	persons: Person[]
	type: 'group' | 'actors'
}

const Actors: FC<ActorsProps> = ({ persons, type }) => {
	const director = persons.filter(pers => pers.professionKey.toLowerCase() === 'director')
	const producer = persons.filter(pers => pers.professionKey.toLowerCase() === 'producer')
	const editor = persons.filter(pers => pers.professionKey.toLowerCase() === 'editor')
	const operator = persons.filter(pers => pers.professionKey.toLowerCase() === 'operator')
	const writer = persons.filter(pers => pers.professionKey.toLowerCase() === 'writer')
	const composer = persons.filter(pers => pers.professionKey.toLowerCase() === 'composer')
	const designer = persons.filter(pers => pers.professionKey.toLowerCase() === 'designer')
	const actor = persons.filter(pers => pers.professionKey.toLowerCase() === 'actor')
	const translator = persons.filter(pers => pers.professionKey.toLowerCase() === 'translator')
	const voiceDirector = persons.filter(pers => pers.professionKey.toLowerCase() === 'voice_director')

	return (
		<div className={cls.actors}>
			{type === 'group' && (
				<>
					{director.length > 0 && (
						<div>
							<h2>Режиссёр{director.length > 1 && 'ы'}: </h2>
							<div className={cls.actorsBlock}>
								{director.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
					{writer.length > 0 && (
						<div>
							<h2>Сценарист{writer.length > 1 && 'ы'}: </h2>
							<div className={cls.actorsBlock}>
								{writer.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
					{voiceDirector.length > 0 && (
						<div>
							<h2>Звукорежисёр{voiceDirector.length > 1 && 'ы'}: </h2>
							<div className={cls.actorsBlock}>
								{voiceDirector.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
					{operator.length > 0 && (
						<div>
							<h2>Оператор{operator.length > 1 && 'ы'}: </h2>
							<div className={cls.actorsBlock}>
								{operator.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
					{producer.length > 0 && (
						<div>
							<h2>Продюссер{producer.length > 1 && 'ы'}: </h2>
							<div className={cls.actorsBlock}>
								{producer.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
					{editor.length > 0 && (
						<div>
							<h2>Редактор{editor.length > 1 && 'ы'}: </h2>
							<div className={cls.actorsBlock}>
								{editor.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
					{composer.length > 0 && (
						<div>
							<h2>Композитор{composer.length > 1 && 'ы'}: </h2>
							<div className={cls.actorsBlock}>
								{composer.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
					{translator.length > 0 && (
						<div>
							<h2>Переводчик{translator.length > 1 && 'и'}: </h2>
							<div className={cls.actorsBlock}>
								{translator.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
					{designer.length > 0 && (
						<div>
							<h2>
								Художник{designer.length > 1 && 'и'}-постановщик{designer.length > 1 && 'и'}:{' '}
							</h2>
							<div className={cls.actorsBlock}>
								{designer.map(pers => (
									<div key={pers.staffId}>
										<Link to={'/actor/' + pers.staffId}>
											<img src={pers.posterUrl} alt="photo" />
										</Link>
										<h3>{pers.nameRu || pers.nameEn}</h3>
									</div>
								))}
							</div>
						</div>
					)}
				</>
			)}
			{type === 'actors' && (
				<div>
					<h2>В ролях: </h2>
					<div className={cls.actorsBlock}>
						{actor.map(pers => (
							<div key={pers.staffId}>
								<Link to={'/actor/' + pers.staffId}>
									<img src={pers.posterUrl} alt="photo" />
								</Link>
								<h3>{pers.nameRu || pers.nameEn}</h3>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Actors
