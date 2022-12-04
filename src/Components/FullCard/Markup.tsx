import { FC } from 'react'
import { Link } from 'react-router-dom'
import cls from './FullCard.module.css'

interface MarkUpProps {
	string: string
}

const Markup: FC<MarkUpProps> = ({ string }) => {
	const hrefs: RegExpMatchArray | null = string.match(/\<a h.+?\/a\>/gis)
	const arr = string.split(/\<a h.+?\/a>/gis)

	function printLink(string: string): string {
		return '/' + string.match(/".+?"/is)?.[0].slice(0, -2).replace('"/', '').replace(/name/, 'actor')
	}

	function printValue(string: string): string {
		return string.match(/\>.+?\<\//is)?.[0].replace(/[\/\<\>]/gi, '') || ''
	}

	return (
		<p>
			{arr.map((el, i) => (
				<>
					{el.replace(/&#[\d]+?;/gi, ' ')}{' '}
					{hrefs && hrefs[i] && (
						<Link to={`${hrefs[i] ? printLink(hrefs[i]) : ''}`} className={cls.link}>
							{printValue(hrefs[i])}
						</Link>
					)}
				</>
			))}
		</p>
	)
}

export default Markup
