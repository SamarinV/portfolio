import { useRef } from 'react'
import s from './Title.module.scss'
import { useAnimatedLetters } from '../../hooks/useAnimatedLetters'

type Props = {
	title: string
}
const Title = ({ title }: Props) => {
		const textRef = useRef<HTMLHeadingElement | null>(null)
		useAnimatedLetters(textRef, {
			char: s.char,
			roller: s.roller,
			mainColor: s.white,
			anotherColor: s.purple,
			auto: false,
			splitType: 'words',
		})
	return ( <h2 ref={textRef} className={s.title}>{title}</h2> );
}
 
export default Title;