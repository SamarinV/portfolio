import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import CSSIcon from '../../assets/scills/css.svg?react'
import FigmaIcon from '../../assets/scills/figma.svg?react'
import GitIcon from '../../assets/scills/git.svg?react'
import HTMLIcon from '../../assets/scills/html.svg?react'
import JavaScriptIcon from '../../assets/scills/javascript.svg?react'
import NextJsIcon from '../../assets/scills/nextjs.svg?react'
import ReactIcon from '../../assets/scills/react.svg?react'
import ReduxIcon from '../../assets/scills/redux.svg?react'
import SassIcon from '../../assets/scills/sass.svg?react'
import TypeScriptIcon from '../../assets/scills/typescript.svg?react'
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import Title from '../../components/Title/Title'
import s from './About.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
	const textRef = useRef<HTMLParagraphElement>(null)
	const skillsRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!skillsRef.current) return

		gsap.fromTo(
			textRef.current,
			{
				x: 200,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',

				scrollTrigger: {
					trigger: textRef.current,
					start: 'top 80%',

					toggleActions: 'play reverse play reverse',
				},
			},
		)
	})

	useGSAP(() => {
		if (!skillsRef.current) return
		const items = skillsRef.current.querySelectorAll(`.${s.skillItem}`)
		gsap.fromTo(
			items,
			{
				x: 100,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.12,

				scrollTrigger: {
					trigger: skillsRef.current,
					start: 'top 75%',
					toggleActions: 'play reverse play reverse',
				},
			},
		)
	})
	return (
		<AnimatedSection>
			<section id="about" className={s.about}>
				<Title title="Обо мне" />
				<div className={s.content}>
					<div ref={textRef} className={s.profile}>
						<div className={s.profile}>
							<div className={s.profileImage}></div>
							<p className={s.text}>
								Я фронтенд-разработчик, увлечённый созданием современных и удобных веб-приложений. Работаю с JavaScript,
								TypeScript, React и постоянно изучаю новые технологии и подходы к разработке. Интерес к IT появился у
								меня ещё в школьные годы: я самостоятельно разбирался с операционными системами, Linux, сетевыми
								технологиями и информационной безопасностью. Этот опыт сформировал мой интерес к разработке и стремление
								постоянно учиться. Сегодня мне нравится создавать качественные пользовательские интерфейсы, решать
								интересные задачи и развиваться в сфере веб-разработки.
							</p>
						</div>
					</div>

					<div ref={skillsRef} className={s.skills}>
						<div className={s.col}>
							<div className={s.skillItem}>
								<HTMLIcon className={s.icon} />
								<span>HTML</span>
							</div>
							<div className={s.skillItem}>
								<CSSIcon className={s.icon} />
								<span>CSS</span>
							</div>
							<div className={s.skillItem}>
								<JavaScriptIcon className={s.icon} />
								<span>JavaScript</span>
							</div>
						</div>
						<div className={s.col}>
							<div className={s.skillItem}>
								<ReactIcon className={s.icon} />
								<span>React</span>
							</div>
							<div className={s.skillItem}>
								<TypeScriptIcon className={s.icon} />
								<span>TypeScript</span>
							</div>
							<div className={s.skillItem}>
								<NextJsIcon className={s.icon} />
								<span>Next.JS</span>
							</div>
							<div className={s.skillItem}>
								<GitIcon className={s.icon} />
								<span>Git</span>
							</div>
						</div>
						<div className={s.col}>
							<div className={s.skillItem}>
								<FigmaIcon className={s.icon} />
								<span>Figma</span>
							</div>
							<div className={s.skillItem}>
								<ReduxIcon className={s.icon} />
								<span>Redux</span>
							</div>
							<div className={s.skillItem}>
								<SassIcon className={s.icon} />
								<span>Sass</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</AnimatedSection>
	)
}
