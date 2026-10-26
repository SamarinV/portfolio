import { useEffect, useId, useRef, useState } from 'react'
import filmFinder from '../../assets/projects/filmFinder.webp'
import hotelDivnomorsk from '../../assets/projects/hotelDivnomorsk.webp'
import landscapeDesign from '../../assets/projects/landscapeDesign.webp'
import spaceGame from '../../assets/projects/spaceGame.webp'
import smartest from '../../assets/projects/smartest.webp'
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import Title from '../../components/Title/Title'

import s from './Projects.module.scss'

type Project = {
	id: number
	title: string
	description: string
	image: string
	link?: string
	github: string | null
	video?: string
	figma?: string
	stack?: string[]
}

const projects: Project[] = [
	{
		id: 1,
		title: 'Гостиница Надежда',
		description: 'Сайт гостевого дома с каталогом номеров, выбором дат и проверкой доступности. Реализовал страницы номеров с фотогалереями и панель администратора для управления номерами, бронированиями, акциями и контактами. Добавил авторизацию и SEO-метаданные.',
		image: hotelDivnomorsk,
		link: 'https://hotel-divnomorsk.vercel.app/',
		github: null,
		stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'SCSS Modules'],
	},
	{
		id: 5,
		title: 'Smartest',
		description: 'Игровое Telegram Mini App с викторинами, рейтингами и профилем пользователя. Разработал фронтенд с нуля: интерфейсы, работу с серверными данными, анимации и переключение языка. Проект больше не публикуется и не поддерживается — доступна видеодемонстрация.',
		image: smartest,
		github: null,
		video: '/videos/smartest.mp4',
		figma: 'https://www.figma.com/design/RyQSs81RxcFjNCDQvIZPOf/Smartest?node-id=1979-6384',
		stack: ['Next.js', 'TypeScript', 'TanStack Query', 'next-intl'],
	},
	{
		id: 2,
		title: 'Film Finder',
		description: 'Каталог фильмов на базе TMDB с тематическими подборками, поиском и подгрузкой результатов. Реализовал страницы фильмов с актёрами, похожими картинами и трейлерами в модальном плеере. Предусмотрел состояния загрузки, пустую выдачу, обработку ошибок API и повтор запросов.',
		image: filmFinder,
		link: 'https://film-finder-app.vercel.app/',
		github: 'https://github.com/SamarinV/FilmFinder',
		stack: ['Next.js', 'TypeScript', 'TMDB API', 'SCSS Modules'],
	},
	{
		id: 3,
		title: 'Landscape Design',
		description: 'Адаптивный сайт ландшафтного дизайнера с интерактивным списком услуг, этапами работы и ответами на частые вопросы. Реализовал форму заявки с валидацией и отправкой в Telegram, раскрывающуюся анкету об участке и мобильную навигацию.',
		image: landscapeDesign,
		link: 'https://landscape-design-kappa.vercel.app/',
		github: 'https://github.com/SamarinV/landscapeDesign',
		stack: ['React', 'TypeScript', 'React Hook Form', 'Zod', 'SCSS Modules'],
	},
	{
		id: 4,
		title: 'Space game',
		description: 'Браузерный космический шутер с врагами, астероидами и боссом. Реализовал столкновения, подбор улучшений оружия и сброс усилений при получении урона, паузу и полноэкранный режим. Оптимизировал отрисовку движущихся объектов и загрузку изображений для мобильных устройств.',
		image: spaceGame,
		link: 'https://space-game-999.vercel.app/',
		github: 'https://github.com/SamarinV/space-game',
		stack: ['React', 'TypeScript', 'Vite', 'SCSS Modules'],
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

type ProjectMedia = { kind: 'image' | 'video'; src: string; title: string }

function MediaViewer({ kind, src, title, onClose }: ProjectMedia & { onClose: () => void }) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const videoRef = useRef<HTMLVideoElement>(null)
	const titleId = useId()

	useEffect(() => {
		const dialog = dialogRef.current
		const video = videoRef.current
		const previousOverflow = document.body.style.overflow
		dialog?.showModal()
		void video?.play().catch(() => {})
		document.body.style.overflow = 'hidden'
		return () => {
			video?.pause()
			document.body.style.overflow = previousOverflow
		}
	}, [])

	return (
		<dialog ref={dialogRef} className={s.videoDialog} aria-labelledby={titleId}
			onClose={onClose}
			onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
			<div>
				<div className={s.videoHeader}>
					<h3 id={titleId}>{title}{kind === 'video' ? ' — видеодемонстрация' : ''}</h3>
					<button type="button" className={s.closeVideo} aria-label="Закрыть просмотр"
						onClick={() => dialogRef.current?.close()} autoFocus>×</button>
				</div>
				{kind === 'video' ? <video ref={videoRef} src={src} controls autoPlay playsInline className={s.video} aria-label={`Демонстрация проекта ${title}`}>
					Ваш браузер не поддерживает видео. <a href={src}>Открыть запись</a>
				</video> : <img src={src} alt={`Скриншот проекта «${title}»`} className={s.fullImage} />}
			</div>
		</dialog>
	)
}

const Projects = () => {
	const [media, setMedia] = useState<ProjectMedia | null>(null)
	return (
	<>
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
							href={project.image}
							aria-haspopup="dialog"
							onClick={(event) => {
								event.preventDefault()
								setMedia({ kind: 'image', src: project.image, title: project.title })
							}}
							rel="noopener noreferrer"
							className={s.imageWrapper}
							aria-label={`Увеличить изображение проекта «${project.title}»`}
						>
							<img
								src={project.image}
								className={`${s.image} ${project.video ? s.imageContain : ''}`}
								alt={`Скриншот проекта «${project.title}»`}
								loading="lazy"
								decoding="async"
							/>
						</a>
						<div className={s.content}>
							<span className={s.number}>ПРОЕКТ {String(index + 1).padStart(2, '0')}</span>
							<h3 className={s.title}>
								{project.title}
								{project.link && <VpnHint />}
							</h3>
							<p className={s.description}>{project.description}</p>
							{project.stack && (
								<ul className={s.stack} aria-label="Технологии проекта">
									{project.stack.map((technology) => <li key={technology}>{technology}</li>)}
								</ul>
							)}
							<div className={s.actions}>
								<a
									href={project.link ?? project.video}
									target={project.video ? undefined : '_blank'}
									aria-haspopup={project.video ? 'dialog' : undefined}
									onClick={(event) => {
										if (project.video) {
											event.preventDefault()
											setMedia({ kind: 'video', src: project.video, title: project.title })
										}
									}}
									rel="noopener noreferrer"
									className="button buttonPrimary"
								>
									{project.video ? 'Смотреть видео' : 'Посмотреть'} <span aria-hidden="true">{project.video ? '▶' : '↗'}</span>
								</a>
								{project.figma && (
									<a href={project.figma} target="_blank" rel="noopener noreferrer" className="button buttonSecondary">
										Макеты в Figma <span aria-hidden="true">↗</span>
									</a>
								)}
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
	{media && <MediaViewer {...media} onClose={() => setMedia(null)} />}
	</>
	)
}

export default Projects
