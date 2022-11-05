import { FC, useState } from 'react'
import lens from '../../Assets/img/lens.svg'
import cls from './Search.module.css'

const Search: FC = () => {
  const [active, setActive] = useState<boolean>(false)

	const toggleInput = () => {
		setActive(!active)
	}
  return (
    <div className={cls.search}>
    <input className={active ? cls.active : ''} type="text" placeholder="Что ищем?" />
    <img src={lens} alt="" onClick={toggleInput} />
  </div>
  )
}

export default Search