import { useEffect, useState } from 'react'
import s from './NavigationBar.module.scss'

const sections = ['hero', 'about', 'projects', 'contacts']

export default function NavigationBar() {
	const [activeSection, setActiveSection] = useState('home')

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id)
					}
				})
			},
			{
				threshold: 0.5,
			},
		)

		sections.forEach((id) => {
			const element = document.getElementById(id)
			if (element) observer.observe(element)
		})

		return () => observer.disconnect()
	}, [])

	return (
		<nav className={s.nav}>
			<ul className={s.navList}>
				{sections.map((section) => (
					<li className={s.navItem} key={section}>
						<a href={`#${section}`} className={activeSection === section ? s.active : ''}>
							{
								{
									hero: 'Главная',
									about: 'Обо мне',
									projects: 'Проекты',
									contacts: 'Контакты',
								}[section]
							}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
