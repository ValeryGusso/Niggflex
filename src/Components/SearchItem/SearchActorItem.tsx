import { FC } from 'react'
import { Link } from 'react-router-dom'
import noimage from '../../Assets/img/noimage.png'
import { Actor } from '../../Interfaces/KPofficial/keywords'
import cls from './SearchItem.module.css'

interface SearchActorItemProps {
	actor: Actor
}

const SearchActorItem: FC<SearchActorItemProps> = ({ actor }) => {
	return (
		<div className={cls.containerActor}>
			<img src={actor.photo || noimage} alt="photo" />
			<div>
				<Link to={`/actor/${actor.id}`}>
					<h2>{`${actor.name || actor.enName}`}</h2>
					<h2>{`${actor.sex?.substring(0, 3)}. ${actor.age ? '(' + actor.age + ') лет' : ''}`}</h2>
				</Link>
			</div>
		</div>
	)
}

export default SearchActorItem
