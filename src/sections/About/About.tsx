import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import s from './About.module.scss'

export default function About() {
	return (
		<AnimatedSection>
			<section id="about" className={s.about}>
				<h2>Обо мне</h2>
			</section>
		</AnimatedSection>
	)
}
