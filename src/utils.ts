import axios from 'axios'

export function fetchFilm(id: number) {
	axios
		.get('https://api.kinopoisk.dev/movie', {
			params: {
				token: '4KCTKW4-FNN45QN-NZFVTWV-XW8D358',
				search: id,
				field: 'id',
			},
		})
		.then(res => {
			return res
		})
}
