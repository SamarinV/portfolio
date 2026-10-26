import { useEffect, useId, useRef, useState } from 'react'
import filmFinder from '../../assets/projects/filmFinder.webp'
import hotelDivnomorsk from '../../assets/projects/hotelDivnomorsk.webp'
import landscapeDesign from '../../assets/projects/landscapeDesign.webp'
import spaceGame from '../../assets/projects/spaceGame.webp'
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import Title from '../../components/Title/Title'

import s from './Projects.module.scss'

const projects = [
	{
		id: 1,
		title: 'Гостиница Надежда',
		description: 'Сайт гостиницы с бронированием номеров и панелью администратора.',
		image: hotelDivnomorsk,
		link: 'https://hotel-divnomorsk.vercel.app/',
		github: null,
	},
	{
		id: 2,
		title: 'Film Finder',
		description: 'Поиск фильмов с использованием базы TMDB.',
		image: filmFinder,
		link: 'https://film-finder-app.vercel.app/',
		github: 'https://github.com/SamarinV/FilmFinder',
	},
	{
		id: 3,
		title: 'Landscape Design',
		description: 'Сайт студии ландшафтного дизайна с презентацией услуг.',
		image: landscapeDesign,
		link: 'https://landscape-design-kappa.vercel.app/',
		github: 'https://github.com/SamarinV/landscapeDesign',
	},
	{
		id: 4,
		title: 'Space game',
		description: 'Космическая мини-игра в браузере.',
		image: spaceGame,
		link: 'https://space-game-999.vercel.app/',
		github: 'https://github.com/SamarinV/space-game',
	},
]

function VpnHint() {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const id = useId()

	useEffect(() => {
		if (!open) return
		const closeOutside = (event: PointerEvent) => {
			if (event.target instanceof Node && !ref.current?.contains(event.target)) setOpen(false)
		}
		document.addEventListener('pointerdown', closeOutside)
		return () => document.removeEventListener('pointerdown', closeOutside)
	}, [open])

	return (
		<div
			ref={ref}
			className={`${s.hint} ${open ? s.hintOpen : ''}`}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
			}}
			onKeyDown={(event) => {
				if (event.key === 'Escape') {
					setOpen(false)
					event.currentTarget.querySelector('button')?.blur()
				}
			}}
		>
			<button
				type="button"
				className={s.hintButton}
				aria-label="Информация о доступе к проекту"
				aria-describedby={id}
				aria-expanded={open}
				onClick={() => setOpen(!open)}
			>
				?
			</button>
			<span id={id} role="tooltip" className={s.tooltip}>
				Для просмотра проекта может потребоваться VPN.
			</span>
		</div>
	)
}

const Projects = () => (
	<section className={s.projects} id="projects">
		<Title title="Проекты" />
		<p className={s.intro}>
			От сайтов для бизнеса до приложений и игр — мои работы в веб-разработке.
		</p>
		<div className={s.list}>
			{projects.map((project, index) => (
				<AnimatedSection key={project.id}>
					<article className={`${s.project} ${index % 2 ? s.reverse : ''}`}>
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className={s.imageWrapper}
							aria-label={`Открыть проект «${project.title}»`}
						>
							<img
								src={project.image}
								className={s.image}
								alt={`Скриншот проекта «${project.title}»`}
								loading="lazy"
								decoding="async"
							/>
						</a>
						<div className={s.content}>
							<span className={s.number}>ПРОЕКТ {String(index + 1).padStart(2, '0')}</span>
							<h3 className={s.title}>
								{project.title}
								<VpnHint />
							</h3>
							<p className={s.description}>{project.description}</p>
							<div className={s.actions}>
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="button buttonPrimary"
								>
									Посмотреть <span aria-hidden="true">↗</span>
								</a>
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="button buttonSecondary"
									>
										GitHub <span aria-hidden="true">↗</span>
									</a>
								)}
							</div>
						</div>
					</article>
				</AnimatedSection>
			))}
		</div>
	</section>
)

export default Projects
