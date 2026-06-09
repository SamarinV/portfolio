import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import s from './Background.module.scss'

export default function Background() {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const dots: HTMLDivElement[] = []

		for (let i = 0; i < 40; i++) {
			const dot = document.createElement('div')

			dot.classList.add(s.dot, Math.random() > 0.5 ? s.red : s.blue)

			if (Math.random() > 0.5) {
				dot.classList.add(s.smallDot)
			}

			container.appendChild(dot)
			dots.push(dot)

			gsap.set(dot, {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
			})

			move(dot)
			glow(dot)
		}

		function move(dot: HTMLDivElement) {
			gsap.to(dot, {
				x: `+=${gsap.utils.random(-200, 200)}`,
				y: `+=${gsap.utils.random(-200, 200)}`,
				duration: gsap.utils.random(8, 20),
				ease: 'sine.inOut',
				onComplete: () => move(dot),
			})
		}

		function glow(dot: HTMLDivElement) {
			gsap.to(dot, {
				opacity: gsap.utils.random(0.2, 0.8),
				duration: gsap.utils.random(2, 5),
				repeat: -1,
				yoyo: true,
			})
		}

		return () => {
			dots.forEach((dot) => dot.remove())
		}
	}, [])

	return <div ref={containerRef} className={s['particles-bg']} />
}
