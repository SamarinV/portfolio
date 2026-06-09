import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import type { RefObject } from 'react'

gsap.registerPlugin(SplitText)

type Props = {
	char: string
	roller: string
	mainColor: string
	anotherColor: string
	auto: boolean
	splitType: 'chars' | 'words'

}

export function useAnimatedLetters(ref: RefObject<HTMLElement | null>, props: Props) {
	useGSAP(
		() => {
			if (!ref.current) return

			const split = SplitText.create(ref.current, {
				type: 'chars words',
				charClass: 'char',
			})
const items = split[props.splitType]
			// build letters
			items.forEach((item) => {
				const letter = item.textContent || ''

				if (!letter.trim()) return

				item.classList.add(props.char)

				item.innerHTML = `
					<div class="${props.roller}">
						<span class="${props.mainColor}">${letter}</span>
						<span class="${props.anotherColor}">${letter}</span>
					</div>
				`

				const el = item as HTMLElement
				const roller = el.querySelector(`.${props.roller}`) as HTMLElement | null

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
						duration: 0.5,
						ease: 'power2.out',
					})

					if (timeout) clearTimeout(timeout)

					timeout = window.setTimeout(() => {
						gsap.to(roller, {
							yPercent: 0,
							duration: 0.5,
							ease: 'power2.inOut',
						})

						el.dataset.hovering = 'false'
					}, 2500)
				})

				el.addEventListener('mouseleave', () => {
					if (el.dataset.hovering === 'true') return

					gsap.to(roller, {
						yPercent: 0,
						duration: 0.5,
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
			const toggleChar = (item: HTMLElement) => {
				if (item.dataset.hovering === 'true') return

				const roller = item.querySelector(`.${props.roller}`) as HTMLElement | null

				if (!roller) return

				const active = item.dataset.active === 'true'

				gsap.to(roller, {
					yPercent: active ? 0 : -50,
					duration: 0.5,
					ease: 'power2.inOut',
				})

				item.dataset.active = String(!active)
			}


				const interval = setInterval(() => {
					if(!props.auto) return
					const chars = split.chars.filter((item) => item.textContent?.trim())
	
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
