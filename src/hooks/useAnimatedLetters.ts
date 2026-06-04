import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import type { RefObject } from 'react'

gsap.registerPlugin(SplitText)

type Classes = {
	char: string
	roller: string
	white: string
	purple: string
}

export function useAnimatedLetters(ref: RefObject<HTMLElement | null>, classes: Classes) {
	useGSAP(
		() => {
			if (!ref.current) return

			const split = SplitText.create(ref.current, {
				type: 'chars words',
				charClass: 'char',
			})

			// build letters
			split.chars.forEach((char) => {
				const letter = char.textContent || ''

				if (!letter.trim()) return

				char.classList.add(classes.char)

				char.innerHTML = `
					<div class="${classes.roller}">
						<span class="${classes.white}">${letter}</span>
						<span class="${classes.purple}">${letter}</span>
					</div>
				`

				const el = char as HTMLElement
				const roller = el.querySelector(`.${classes.roller}`) as HTMLElement | null

				if (!roller) return

				let timeout: number | null = null

				// =========================
				// HOVER LOGIC
				// =========================
				el.addEventListener('mouseenter', () => {
					if (el.dataset.locked === 'true') return

					el.dataset.hovering = 'true'

					gsap.to(roller, {
						yPercent: -50,
						duration: 0.3,
						ease: 'power2.out',
					})

					if (timeout) clearTimeout(timeout)

					timeout = window.setTimeout(() => {
						gsap.to(roller, {
							yPercent: 0,
							duration: 0.3,
							ease: 'power2.inOut',
						})

						el.dataset.hovering = 'false'
					}, 2500)
				})

				el.addEventListener('mouseleave', () => {
					if (el.dataset.hovering === 'true') return

					gsap.to(roller, {
						yPercent: 0,
						duration: 0.3,
						ease: 'power2.inOut',
					})
				})
			})

			// =========================
			// INTRO ANIMATION
			// =========================
			gsap.from(split.chars, {
				yPercent: 'random(-100, 100, true)',
				rotation: 'random(-30, 30)',
				duration: 1,
				autoAlpha: 0,
				stagger: {
					each: 0.03,
					from: 'random',
				},
			})

			// =========================
			// RANDOM ANIMATION LOOP
			// =========================
			const toggleChar = (char: HTMLElement) => {
				if (char.dataset.hovering === 'true') return

				const roller = char.querySelector(`.${classes.roller}`) as HTMLElement | null

				if (!roller) return

				const active = char.dataset.active === 'true'

				gsap.to(roller, {
					yPercent: active ? 0 : -50,
					duration: 0.35,
					ease: 'power2.inOut',
				})

				char.dataset.active = String(!active)
			}

			const interval = setInterval(() => {
				const chars = split.chars.filter((char) => char.textContent?.trim())

				const shuffled = [...chars].sort(() => Math.random() - 0.5)

				const count = Math.random() > 0.5 ? 2 : 1

				shuffled.slice(0, count).forEach((char) => {
					toggleChar(char as HTMLElement)
				})
			}, 800)

			return () => {
				clearInterval(interval)
				split.revert()
			}
		},
		{ scope: ref },
	)
}
