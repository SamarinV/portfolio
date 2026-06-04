import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedSectionProps {
	children: ReactNode
}
export default function AnimatedSection({ children }: AnimatedSectionProps) {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	})

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 60 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
			transition={{ duration: 0.7 }}
		>
			{children}
		</motion.div>
	)
}
