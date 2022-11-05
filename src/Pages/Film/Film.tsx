import { FC } from 'react'
import FullCard from '../../Components/FullCard/FullCard'
import cls from './Film.module.css'

const Film: FC = () => {
  return (
    <div className={cls.film}>
        <FullCard />
    </div>
  )
}

export default Film