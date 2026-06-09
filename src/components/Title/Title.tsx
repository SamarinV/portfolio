import s from './Title.module.scss'

type Props = {
	title: string
}
const Title = ({ title }: Props) => {
	return ( <h2 className={s.title}>{title}</h2> );
}
 
export default Title;