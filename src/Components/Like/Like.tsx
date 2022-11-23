import { HandySvg } from 'handy-svg'
import { FC } from 'react'
import like from '../../Assets/img/like.svg'
import cls from './Like.module.css'

interface LikeProps {
	type: 'like' | 'dislike'
	count: number
}

const Like: FC<LikeProps> = ({ type, count }) => {
	return (
		<div className={cls.like}>
			<h1>{count}</h1>
			<HandySvg src={like} fill={type === 'like' ? 'green' : 'red'} className={type === 'dislike' ? cls.dis : ''} />
		</div>
	)
}

export default Like
