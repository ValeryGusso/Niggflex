import { Country, Genre } from '../Interfaces/KPunofficial/keywords'

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
