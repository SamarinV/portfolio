import Matter from 'matter-js'
import { useEffect, useRef } from 'react'

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
import FramerMotionIcon from '../../assets/scills/framerMotion.svg?react'

import s from './SkillsPhysics.module.scss'

const skills = [
	{ name: 'HTML', icon: HTMLIcon },
	{ name: 'CSS', icon: CSSIcon },
	{ name: 'JavaScript', icon: JavaScriptIcon },
	{ name: 'React', icon: ReactIcon },
	{ name: 'TypeScript', icon: TypeScriptIcon },
	{ name: 'Next.js', icon: NextJsIcon },
	{ name: 'Redux', icon: ReduxIcon },
	{ name: 'Sass', icon: SassIcon },
	{ name: 'Figma', icon: FigmaIcon },
	{ name: 'Git', icon: GitIcon },
	{ name: 'Framer Motion', icon: FramerMotionIcon },
]

export default function SkillsPhysics() {
	const containerRef = useRef<HTMLDivElement>(null)
	const jsRef = useRef<HTMLDivElement>(null)
	const bubbleRefs = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		if (!containerRef.current) return

		const container = containerRef.current
		const width = container.offsetWidth
		const height = 500

		// ======================
		// RESPONSIVE SCALE
		// ======================
		const isMobile = window.innerWidth < 768
		const scale = isMobile ? 0.7 : 1

		// ======================
		// ENGINE
		// ======================
		const engine = Matter.Engine.create()
		engine.gravity.x = 0
		engine.gravity.y = 0

		const world = engine.world

		// ======================
		// SIZES
		// ======================
		const SIZE = 110 * scale
		const RADIUS = SIZE / 2

		const JS_SIZE = 200 * scale
		const JS_RADIUS = JS_SIZE / 2

		const coreX = width / 2
		const coreY = height / 2

		const desiredRadius = 180 * scale

		container.style.setProperty('--bubble-size', `${SIZE}px`)
		container.style.setProperty('--bubble-js-size', `${JS_SIZE}px`)

		// ======================
		// JS BUBBLE
		// ======================
		const jsBubble = Matter.Bodies.circle(coreX, coreY, JS_RADIUS, {
			restitution: 0.9,
			frictionAir: 0.08,
		})

		// ======================
		// OTHER BUBBLES
		// ======================
		const bubbles = skills
			.filter((s) => s.name !== 'JavaScript')
			.map(() =>
				Matter.Bodies.circle(coreX + (Math.random() - 0.5) * 250, coreY + (Math.random() - 0.5) * 250, RADIUS, {
					restitution: 0.9,
					frictionAir: 0.06,
				}),
			)

		Matter.World.add(world, [jsBubble, ...bubbles])

		// ======================
		// WALLS
		// ======================
		const thickness = 200

		Matter.World.add(world, [
			Matter.Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }),
			Matter.Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }),
			Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
			Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }),
		])

		// ======================
		// RUNNER
		// ======================
		const runner = Matter.Runner.create()
		Matter.Runner.run(runner, engine)

		// ======================
		// MOUSE
		// ======================
		let mouseX = 0
		let mouseY = 0

		const updateMouse = (e: PointerEvent) => {
			const rect = container.getBoundingClientRect()
			mouseX = e.clientX - rect.left
			mouseY = e.clientY - rect.top
		}

		container.addEventListener('pointermove', updateMouse)
		container.addEventListener('pointerdown', updateMouse)

		container.addEventListener('pointerup', () => {
			mouseX = -9999
			mouseY = -9999
		})

		container.addEventListener('pointercancel', () => {
			mouseX = -9999
			mouseY = -9999
		})
		// ======================
		// LOOP
		// ======================
		const update = () => {
			// ======================
			// JS RETURN TO CENTER
			// ======================
			const dxC = jsBubble.position.x - coreX
			const dyC = jsBubble.position.y - coreY

			Matter.Body.applyForce(jsBubble, jsBubble.position, {
				x: -dxC * 0.001,
				y: -dyC * 0.001,
			})

			// ======================
			// JS MOUSE REPEL
			// ======================
			const mxC = jsBubble.position.x - mouseX
			const myC = jsBubble.position.y - mouseY

			const mDistC = Math.sqrt(mxC * mxC + myC * myC)

			if (mDistC < 160 && mDistC > 0) {
				Matter.Body.applyForce(jsBubble, jsBubble.position, {
					x: (mxC / mDistC) * 0.03,
					y: (myC / mDistC) * 0.03,
				})
			}

			bubbles.forEach((bubble, index) => {
				// ======================
				// ATTRACT TO JS
				// ======================
				const dx = bubble.position.x - jsBubble.position.x
				const dy = bubble.position.y - jsBubble.position.y

				const dist = Math.sqrt(dx * dx + dy * dy)

				if (dist > 0) {
					Matter.Body.applyForce(bubble, bubble.position, {
						x: (-dx / dist) * 0.00008,
						y: (-dy / dist) * 0.00008,
					})
				}

				// ======================
				// ORBIT
				// ======================
				const dx2 = bubble.position.x - coreX
				const dy2 = bubble.position.y - coreY

				const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
				const diff = dist2 - desiredRadius

				if (dist2 > 0) {
					Matter.Body.applyForce(bubble, bubble.position, {
						x: (-dx2 / dist2) * diff * 0.00015,
						y: (-dy2 / dist2) * diff * 0.00015,
					})
				}

				// ======================
				// MOUSE REPEL
				// ======================
				const mx = bubble.position.x - mouseX
				const my = bubble.position.y - mouseY

				const mDist = Math.sqrt(mx * mx + my * my)

				if (mDist < 130 && mDist > 0) {
					Matter.Body.applyForce(bubble, bubble.position, {
						x: (mx / mDist) * (isMobile ? 0.05 : 0.08),
						y: (my / mDist) * (isMobile ? 0.05 : 0.08),
					})
				}

				// ======================
				// RENDER
				// ======================
				const el = bubbleRefs.current[index]

				if (el) {
					el.style.transform = `translate(${bubble.position.x - RADIUS}px, ${bubble.position.y - RADIUS}px)`
				}
			})

			// ======================
			// RENDER JS BUBBLE
			// ======================
			if (jsRef.current) {
				jsRef.current.style.transform = `translate(${jsBubble.position.x - JS_RADIUS}px, ${jsBubble.position.y - JS_RADIUS}px)`
			}

			requestAnimationFrame(update)
		}

		update()

		return () => {
			Matter.Runner.stop(runner)
			Matter.Engine.clear(engine)
		}
	}, [])

	return (
		<div ref={containerRef} className={s.container}>
			{/* JS BUBBLE */}
			<div ref={jsRef} className={`${s.bubble} ${s.mainBubble}`}>
				<JavaScriptIcon className={s.icon} />
				<span>JavaScript</span>
			</div>

			{/* OTHER SKILLS */}
			{skills
				.filter((skill) => skill.name !== 'JavaScript')
				.map((skill, i) => {
					const Icon = skill.icon

					return (
						<div
							key={skill.name}
							className={s.bubble}
							ref={(el) => {
								bubbleRefs.current[i] = el
							}}
						>
							<Icon className={s.icon} />
							<span className={s.skillName}>{skill.name}</span>
						</div>
					)
				})}
		</div>
	)
}
