import s from './Header.module.scss'

export default function Header() {
	return (
		<header className={s.header}>
			<nav className={s.nav}>
				<a href="#home">Главная</a>
				<a href="#about">Обо мне</a>
				<a href="#skills">Навыки</a>
				<a href="#projects">Проекты</a>
				<a href="#contact">Контакты</a>
			</nav>
		</header>
	)
}
