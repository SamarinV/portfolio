import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedSectionProps {
	children: ReactNode
}
export default function AnimatedSection({ children }: AnimatedSectionProps) {
	const reduceMotion = useReducedMotion()
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	return (
		<motion.div
			ref={ref}
			initial={reduceMotion ? false : { opacity: 0, y: 24 }}
			animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
			transition={{ duration: 0.4 }}
		>
			{children}
		</motion.div>
	)
}
