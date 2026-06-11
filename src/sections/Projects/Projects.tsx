import filmFinder from '../../assets/projects/filmFinder.webp'
import friendlily from '../../assets/projects/friendlily.webp'
import landscapeDesign from '../../assets/projects/landscapeDesign.webp'
import spaceGame from '../../assets/projects/spaceGame.webp'
import taskBloom from '../../assets/projects/taskBloom.webp'
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import Title from '../../components/Title/Title'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import s from './Projects.module.scss'

const projects = [
	{
		id: 1,
		title: 'Film Finder',
		description: 'Приложение для поиска фильмов, с базой данных от TMDB',
		image: filmFinder,
		link: 'https://film-finder-app.vercel.app/',
		github: 'https://github.com/SamarinV/FilmFinder',
	},
	{
		id: 2,
		title: 'Friendlily',
		description: 'Социальная сеть, для общения с друзьями',
		image: friendlily,
		link: 'https://samarinv.github.io/friendlily',
		github: 'https://github.com/SamarinV/friendlily',
	},
	{
		id: 3,
		title: 'Landscape Design',
		description: 'Сайт ландшафтного дизайна, для заказа ландшафта',
		image: landscapeDesign,
		link: 'https://landscape-design-kappa.vercel.app/',
		github: 'https://github.com/SamarinV/landscapeDesign',
	},
	{
		id: 4,
		title: 'Space game',
		description: 'Мини коссмическя игра, для развлечения',
		image: spaceGame,
		link: 'https://space-game-999.vercel.app/',
		github: 'https://github.com/SamarinV/space-game',
	},
	{
		id: 5,
		title: 'Task Bloom',
		description: 'Менеджер задач, для управления задачами',
		image: taskBloom,
		link: 'https://samarinv.github.io/TaskBloom/#/',
		github: 'https://github.com/SamarinV/TaskBloom',
	},
]

const Projects = () => {
	const listRef = useRef<HTMLDivElement>(null)
	useGSAP(() => {
		if (!listRef.current) return

		const projects = gsap.utils.toArray<HTMLElement>(listRef.current.querySelectorAll(`.${s.project}`))

		projects.forEach((project) => {
			const image = project.querySelector(`.${s.imageWrapper}`)
			const content = project.querySelector(`.${s.content}`)

			if (!image || !content) return

			const reversed = project.classList.contains(s.reverse)

			gsap.fromTo(
				image,
				{
					x: reversed ? 200 : -200,
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: project,
						start: 'top 80%',
						toggleActions: 'play reverse play reverse',
					},
				},
			)

			gsap.fromTo(
				content,
				{
					x: reversed ? -200 : 200,
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: project,
						start: 'top 80%',
						toggleActions: 'play reverse play reverse',
					},
				},
			)
		})
	}, [])
	return (
		<AnimatedSection>
			<section className={s.projects} id="projects">
				<Title title="Проекты" />
				<div ref={listRef} className={s.list}>
					{projects.map((project, index) => (
						<div key={project.id} className={`${s.project} ${index % 2 ? s.reverse : ''}`}>
							<a href={project.link} target="_blank">
								<div className={s.imageWrapper}>
									<img src={project.image} className={s.image} alt={project.title} />
								</div>
							</a>

							<div className={s.content}>
								<h3 className={s.title}>{project.title}</h3>
								<p className={s.description}>{project.description}</p>
								<a href={project.link} target="_blank" className={s.link}>
									Посмотреть
								</a>
								<a href={project.github} target="_blank" className={s.link}>
									Открыть GitHub
								</a>
							</div>
						</div>
					))}
				</div>
			</section>
		</AnimatedSection>
	)
}

export default Projects
