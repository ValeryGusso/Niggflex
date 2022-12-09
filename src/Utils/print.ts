import { movieType } from '../Assets/constants'
import { Fees } from '../Interfaces/KPunofficial/fees'
import { Country, Genre } from '../Interfaces/KPunofficial/keywords'
import { Country as CountryPremieres } from '../Interfaces/KPunofficial/premieres'
import { Genre as GenrePremieres } from '../Interfaces/KPunofficial/search'

export function printGenres(array: Genre[]): string {
	const genres: string[] = []
	array.forEach(el => el.genre && genres.push(el.genre))

	return genres.join(', ')
}

export function printCountries(array: Country[]): string {
	const countries: string[] = []
	array.forEach(el => el.country && countries.push(el.country))

	return countries.join(', ')
}

export function printType(type: string): string {
	switch (type) {
		case movieType[0].value:
			return 'т ' + movieType[0].title
		case movieType[1].value:
			return 'о ' + movieType[1].title
		case movieType[2].value:
			return 'т ' + movieType[2].title
		case movieType[3].value:
			return 'т ' + movieType[3].title
		default:
			return ''
	}
}

export function printNoveltyType(type: number): string {
	switch (type) {
		case 1:
			return 'кино'
		case 2:
			return 'сериалов'
		case 3:
			return 'мультфильмов'
		case 4:
			return 'аниме'
		case 5:
			return 'хз чего'
		default:
			return ''
	}
}

export function printFees(fees: Fees[]): string {
	const result: string[] = []
	fees.forEach(el => {
		if (el.type !== 'BUDGET') {
			let country
			switch (el.type) {
				case 'USA':
					country = 'США'
					break
				case 'RUS':
					country = 'Россия'
					break
				case 'WORLD':
					country = 'Мир'
					break
				default:
					country = 'Где-то'
			}
			result.push(`${country}: ${el.amount} ${el.symbol}`)
		}
	})
	return result.join(' / ')
}

export function printPostfix(title: string): string {
	switch (title) {
		case 'Переводчик':
			return 'и'
		case 'В ролях':
			return ''
		default:
			return 'ы'
	}
}

export function printPremieresCountry(array: CountryPremieres[]): string {
	let countries: string[] = []
	array.forEach(el => countries.push(el.country))
	let result = countries.join(', ')
	if (array.length > 1) {
		result = 'ы: ' + result
	} else {
		result = 'а: ' + result
	}
	return result
}

export function printPremieresGenres(array: GenrePremieres[]): string {
	let genres: string[] = []
	array.forEach(el => genres.push(el.genre))
	let result = genres.join(', ')
	if (array.length > 1) {
		result = 'ы: ' + result
	} else {
		result = ': ' + result
	}
	return result
}

export function cut(string: string | null, limit: number): string {
	if (!string) {
		return 'Нет данных'
	}
	if (string.length > limit) {
		let shorted = string.slice(0, limit)
		shorted += '...'
		return shorted
	} else {
		return string
	}
}
