import { FC } from 'react'
import cls from './Loader.module.css'

const Loader: FC = () => {
	return (
		<div className={cls.loader}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Loader
