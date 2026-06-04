import s from './Hero.module.scss'

export default function Hero() {
	return (
		<section className={s.hero} id="home">
			<h1>Привет, меня зовут Владимир</h1>
			<p>Frontend Developer</p>
		</section>
	)
}
