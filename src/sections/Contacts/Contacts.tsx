import AnimatedSection from '../../components/AnimatedSection/AnimatedSection'
import Title from '../../components/Title/Title'
import s from './Contacts.module.scss'

const Contacts = () => {
	return (
		<AnimatedSection>
			<section className={s.contacts} id="contacts">
				<Title title="Контакты" />
			</section>
		</AnimatedSection>
	)
}

export default Contacts
