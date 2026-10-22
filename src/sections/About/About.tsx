import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import SkillsPhysics from '../../components/SkillsPhysics/SkillsPhysics'
import Title from '../../components/Title/Title'
import s from './About.module.scss'

export default function About() {
	return (
		<section id="about" className={s.about}>
			<Title title="Обо мне" />
			<div className={s.content}>
				<AnimatedSection>
					<div className={s.profile}>
						<p className={s.eyebrow}>Интерес к технологиям. Внимание к деталям.</p>
						<p className={s.text}>Я Владимир, фронтенд-разработчик. Работаю с JavaScript, TypeScript и React: создаю интерфейсы, в которых важны и внешний вид, и удобство использования.</p>
						<p className={s.text}>Начинал с самостоятельного изучения Linux, сетей и информационной безопасности. Сейчас развиваюсь в веб-разработке и применяю новые знания в своих проектах.</p>
						<a href="#projects" className={s.link}>Мои работы <span aria-hidden="true">↗</span></a>
					</div>
				</AnimatedSection>
				<SkillsPhysics />
			</div>
		</section>
	)
}
