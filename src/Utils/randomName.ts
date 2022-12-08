import { alphabet } from '../Assets/constants'

export function randomName(length: number): string {
	const result: string[] = []
	for (let i = 0; i < length; i++) {
		const letter = alphabet[Math.floor(Math.random() * alphabet.length)]
		result.push(Math.random() > 0.5 ? letter.toUpperCase() : letter)
	}
	return result.join('')
}
