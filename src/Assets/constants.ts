import home from './img/home.svg'
import filter from './img/filter.svg'
import film from './img/film.svg'
import tv from './img/tv.svg'
import cartoon from './img/cartoon.svg'
import favorite from './img/favorite.svg'
import premieres from './img/premieres.svg'
import anime from './img/anime.png'

export interface filmMenuItem {
	title: string
	value: string
}

export interface headerMenuItem {
	title: string
	value: string
	img: string
}

export const filmMenu: filmMenuItem[] = [
	{
		title: 'Описание',
		value: 'description',
	},
	{
		title: 'Интересные факты',
		value: 'facts',
	},
	{
		title: 'Над фильмом работали',
		value: 'group',
	},
	{
		title: 'Актёрский состав',
		value: 'actors',
	},
	{
		title: 'Изображения',
		value: 'images',
	},
]

export const headerMenu: headerMenuItem[] = [
	{
		title: 'Главная',
		value: '/',
		img: home,
	},
	{
		title: 'Поиск',
		value: '/filters',
		img: filter,
	},
	{
		title: 'Премьеры',
		value: '/premieres',
		img: premieres,
	},
	{
		title: 'Фильмы',
		value: '/films',
		img: film,
	},
	{
		title: 'Сериалы',
		value: '/series',
		img: tv,
	},
	{
		title: 'Мультфильмы',
		value: '/cartoon',
		img: cartoon,
	},
	{
		title: 'Аниме',
		value: '/anime',
		img: anime,
	},
	{
		title: 'Избранное',
		value: '/favorite',
		img: favorite,
	},
]

export const genresList: string[] = [
	'аниме',
	'биография',
	'боевик',
	'вестерн',
	'военный',
	'детектив',
	'детский',
	'документальный',
	'драма',
	'история',
	'комедия',
	'концерт',
	'короткометражка',
	'криминал',
	'мелодрама',
	'музыка',
	'мультфильм',
	'мюзикл',
	'приключения',
	'реальное ТВ',
	'семейный',
	'спорт',
	'триллер',
	'ужасы',
	'фантастика',
	'фильм-нуар',
	'фэнтези',
	'церемония',
]

export const genders: string[] = ['man', 'woman', 'helicopter']

export const months: string[] = [
	'JANUARY',
	'FEBRUARY',
	'MARCH',
	'APRIL',
	'MAY',
	'JUNE',
	'JULY',
	'AUGUST',
	'SEPTEMBER',
	'OCTOBER',
	'NOVEMBER',
	'DECEMBER',
]

export const monthsForPrint: string[] = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
]

export interface SearchItem {
	title: string
	value: string
}

export const searchTypes: SearchItem[] = [
	{ title: 'фильмов', value: 'FILM' },
	{ title: 'тв-шоу', value: 'TV_SHOW' },
	{ title: 'сериалов', value: 'TV_SERIES' },
	{ title: 'мини-сериалов', value: 'MINI_SERIES' },
	{ title: 'всего', value: 'ALL' },
]

export const movieType: SearchItem[] = [
	{ title: 'фильм', value: 'FILM' },
	{ title: 'тв-шоу', value: 'TV_SHOW' },
	{ title: 'сериал', value: 'TV_SERIES' },
	{ title: 'мини-сериал', value: 'MINI_SERIES' },
]

export interface GenresItem {
	id: number
	genre: string
}

export const genres: GenresItem[] = [
	{
		id: 1,
		genre: 'триллер',
	},
	{
		id: 2,
		genre: 'драма',
	},
	{
		id: 3,
		genre: 'криминал',
	},
	{
		id: 4,
		genre: 'мелодрама',
	},
	{
		id: 5,
		genre: 'детектив',
	},
	{
		id: 6,
		genre: 'фантастика',
	},
	{
		id: 7,
		genre: 'приключения',
	},
	{
		id: 8,
		genre: 'биография',
	},
	{
		id: 9,
		genre: 'фильм-нуар',
	},
	{
		id: 10,
		genre: 'вестерн',
	},
	{
		id: 11,
		genre: 'боевик',
	},
	{
		id: 12,
		genre: 'фэнтези',
	},
	{
		id: 13,
		genre: 'комедия',
	},
	{
		id: 14,
		genre: 'военный',
	},
	{
		id: 15,
		genre: 'история',
	},
	{
		id: 16,
		genre: 'музыка',
	},
	{
		id: 17,
		genre: 'ужасы',
	},
	{
		id: 18,
		genre: 'мультфильм',
	},
	{
		id: 19,
		genre: 'семейный',
	},
	{
		id: 20,
		genre: 'мюзикл',
	},
	{
		id: 21,
		genre: 'спорт',
	},
	{
		id: 22,
		genre: 'документальный',
	},
	{
		id: 23,
		genre: 'кор. метр',
	},
	{
		id: 24,
		genre: 'аниме',
	},
	{
		id: 25,
		genre: 'без жанра',
	},
	{
		id: 26,
		genre: 'новости',
	},
	{
		id: 27,
		genre: 'концерт',
	},
	{
		id: 28,
		genre: 'для взрослых',
	},
	{
		id: 29,
		genre: 'церемония',
	},
	{
		id: 30,
		genre: 'реальное ТВ',
	},
	{
		id: 31,
		genre: 'игра',
	},
	{
		id: 32,
		genre: 'ток-шоу',
	},
	{
		id: 33,
		genre: 'детский',
	},
]

export const ratingColors: string[] = ['#fe5a4f', '#feef55', '#5cff6a']

export const reviewsColors: string[] = ['#7bf193', '#678cf9', '#d76f78', '#bababa']

export const alphabet: string[] = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
]
