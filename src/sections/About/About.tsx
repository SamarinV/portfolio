import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import SkillsPhysics from '../../components/SkillsPhysics/SkillsPhysics'
import Title from '../../components/Title/Title'
import SplitText from 'gsap/SplitText'
import s from './About.module.scss'

// gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

export default function About() {
	const textRef = useRef<HTMLParagraphElement>(null)

useGSAP(() => {
	if (!textRef.current) return

	const split = new SplitText(textRef.current, {
		type: 'lines',
		linesClass: 'line',
	})

	gsap.from(split.lines, {
		y: 50,
		opacity: 0,
		duration: 0.8,
		stagger: 0.4,
		ease: 'power3.out',

		scrollTrigger: {
			trigger: textRef.current,
			start: 'top 80%',
			toggleActions: 'play reverse play reverse',
		},
	})

	return () => {
		split.revert()
	}
})

	return (
		<AnimatedSection>
			<section id="about" className={s.about}>
				<Title title="Обо мне" />
				<div className={s.content}>
					<div className={s.profile}>
						<div className={s.profile}>
							<div className={s.profileImage}></div>
							<p ref={textRef} className={s.text}>
								Я фронтенд-разработчик, увлечённый созданием современных и удобных веб-приложений. Работаю с JavaScript,
								TypeScript, React и постоянно изучаю новые технологии и подходы к разработке. Интерес к IT появился у
								меня ещё в школьные годы: я самостоятельно разбирался с операционными системами, Linux, сетевыми
								технологиями и информационной безопасностью. Этот опыт сформировал мой интерес к разработке и стремление
								постоянно учиться. Сегодня мне нравится создавать качественные пользовательские интерфейсы, решать
								интересные задачи и развиваться в сфере веб-разработки.
							</p>
						</div>
					</div>
					<SkillsPhysics />
				</div>
			</section>
		</AnimatedSection>
	)
}
