import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axiosKPunofficial from '../../axios/KPunofficial'
import { Award, AwardsResponse } from '../../Interfaces/KPunofficial/awards'
import awardDef from '../../Assets/img/award_def.png'
import cls from './FullCard.module.css'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

interface BlockState {
	name: string
	image: string | null
}

const Awards: FC = () => {
	const params = useParams()
	const [awards, setAwards] = useState<Award[] | null>(null)
	const [blocks, setBlocks] = useState<BlockState[] | null>(null)
	const [activeCategory, setActiveCategory] = useState(0)

	useEffect(() => {
		axiosKPunofficial.get<AwardsResponse>(`/v2.2/films/${params.id}/awards`).then(res => {
			const names = new Set<string>()
			res.data.items.forEach(el => names.add(el.name))

			const result: BlockState[] = []
			const namesArray = Array.from(names.values())

			namesArray.forEach(name => {
				const found = res.data.items.find(el => el.name === name)
				found ? result.push({ name, image: found.imageUrl }) : result.push({ name, image: null })
			})

			setBlocks(result)
			setAwards(res.data.items)
		})
	}, [params.id])

	return (
		<div className={cls.awards}>
			{awards && awards?.length > 0 && (
				<>
					<h1>Награды:</h1>
					{blocks && blocks.length > 0 && (
						<>
							<div className={cls.searchAward}>
								{blocks.map((el, i) => (
									<div
										key={el.name}
										onClick={() => setActiveCategory(i)}
										className={classNames(cls.searchAwardItem, i === activeCategory ? cls.activeAward : '')}
									>
										<img src={el.image || awardDef} alt="award image" />
										<h2>{el.name}</h2>
									</div>
								))}
							</div>
						</>
					)}
					{awards && blocks && awards?.length > 0 && (
						<div className={cls.awardsList}>
							{awards.map(
								award =>
									award.persons.length > 0 &&
									award.name === blocks[activeCategory].name && (
										<div className={cls.awardPerson}>
											<img src={award.persons[0].posterUrl} alt="photo" />
											<div>
												<Link to={`/actor/${award.persons[0].kinopoiskId}`}>
													{award.persons[0].nameRu || award.persons[0].nameEn}
												</Link>
												<h2>{award.persons[0].profession}</h2>
												<h2>
													{award.win ? 'Лауреат' : 'Номинант'} ({award.year}) в категории {award.nominationName}
												</h2>
											</div>
										</div>
									)
							)}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default Awards
