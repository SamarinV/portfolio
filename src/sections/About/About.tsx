import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import SkillsPhysics from '../../components/SkillsPhysics/SkillsPhysics'
import Title from '../../components/Title/Title'
import s from './About.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
	const textRef = useRef<HTMLParagraphElement>(null)

	useGSAP(() => {
		if (!textRef.current) return

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
				</div>
				<SkillsPhysics />
			</section>
		</AnimatedSection>
	)
}
