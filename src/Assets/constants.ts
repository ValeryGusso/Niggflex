import home from './img/home.svg'
import film from './img/film.svg'
import tv from './img/tv.svg'
import cartoon from './img/cartoon.svg'
import favorite from './img/favorite.svg'

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
