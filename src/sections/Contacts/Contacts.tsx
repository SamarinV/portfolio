import Title from '../../components/Title/Title'
import s from './Contacts.module.scss'

export default function Contacts() {
	return (
		<section className={s.contacts} id="contacts">
			<Title title="Контакты" />
			<div className={s.card}>
				<p className={s.status}><span aria-hidden="true" />Открыт к предложениям</p>
				<h3>Давайте создадим что-нибудь полезное</h3>
				<p className={s.description}>Если вы ищете фронтенд-разработчика или хотите обсудить проект — напишите мне в Telegram.</p>
				<div className={s.actions}>
					<a className="button buttonPrimary" href="https://t.me/vova_samar" target="_blank" rel="noopener noreferrer">Написать в Telegram <span aria-hidden="true">↗</span></a>
					<a className="button buttonSecondary" href="https://github.com/SamarinV" target="_blank" rel="noopener noreferrer">Мой GitHub</a>
				</div>
			</div>
		</section>
	)
}
