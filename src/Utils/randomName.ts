import { alphabet } from '../Assets/constants'

export function randomName(lenght: number): string {
	const result: string[] = []
	for (let i = 0; i < lenght; i++) {
		let letter = alphabet[Math.floor(Math.random() * alphabet.length)]
		result.push(Math.random() > 0.5 ? letter.toUpperCase() : letter)
	}
	return result.join('')
}
