import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'

import myPhoto from '../../assets/me.webp'
import { useAnimatedLetters } from '../../hooks/useAnimatedLetters'
import { useTypewriter } from '../../hooks/useTypewriter'
import s from './Hero.module.scss'

gsap.registerPlugin(SplitText)

export default function Hero() {
	const textRef = useRef<HTMLHeadingElement | null>(null)
	useAnimatedLetters(textRef, {
		char: s.char,
		roller: s.roller,
		mainColor: s.white,
		anotherColor: s.purple,
		auto: true,
		splitType: 'chars',
	})
	const typedText = useTypewriter(
		`name: "Владимир",
role: "Frontend Developer",
stack: [
  "React",
  "TypeScript",
  "Redux Toolkit",
  "SCSS",
  "Vite"
],
openToWork: true`,
		40,
	)
	return (
		<section className={s.hero} id="hero">
			<div className={s.content}>
				<h1 ref={textRef} className={s.title}>
					Frontend Developer
				</h1>

				<div className={s.monitorWrapper}>
					<div className={s.monitor}>
						<div className={s.screen}>
							<pre className={s.code}>
								{typedText}
								<span className={s.cursor}>|</span>
							</pre>
						</div>

						<div className={s.stand}></div>
					</div>

					<div className={s.photoWrapper}>
						<img src={myPhoto} className={s.photo} alt="Vladimir" />
					</div>
				</div>
			</div>
		</section>
	)
}
