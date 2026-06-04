import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 80) {
	const [value, setValue] = useState('')

	useEffect(() => {
		let index = 0

		const interval = setInterval(() => {
			setValue(text.slice(0, index + 1))
			index++

			if (index >= text.length) {
				clearInterval(interval)
			}
		}, speed)

		return () => clearInterval(interval)
	}, [text, speed])

	return value
}
