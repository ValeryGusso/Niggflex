import { FC, useState } from 'react'
import { Actor } from '../../Interfaces/KPofficial/keywords'
import noimage from '../../Assets/img/noimage.png'
import cls from './Search.module.css'
import { Link } from 'react-router-dom'
import Image from './Image'

interface ActorItemProps {
	actor: Actor
}

const ActorItem: FC<ActorItemProps> = ({ actor }) => {
	const [showImage, setShowImage] = useState(false)
	return (
		<div className={cls.actor}>
			<img onClick={() => setShowImage(true)} src={actor.photo || noimage} alt="photo" />
			<div>
				<Link to={`/actor/${actor.id}`}>
					{' '}
					<h2>{`${actor.name || actor.enName}`}</h2>
					<h2>{`${actor.sex?.substring(0, 3)}. ${actor.age ? '(' + actor.age + ') лет' : ''}`}</h2>
				</Link>
			</div>
			{showImage && (
				<div className={cls.cart} style={{ top: '10vmin', left: '52vmax' }}>
					<Image url={actor.photo || noimage} hide={setShowImage} />
				</div>
			)}
		</div>
	)
}

export default ActorItem
