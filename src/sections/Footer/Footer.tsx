import GitHubIcon from '../../assets/social/github.svg?react'
import TelegramIcon from '../../assets/social/telegram.svg?react'
import s from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.btns}>
				<a href="https://github.com/SamarinV" target="_blank" rel="noopener noreferrer" className={s.btn}>
					<GitHubIcon className={s.icon} />
				</a>

				<a href="https://t.me/vova_samar" target="_blank" rel="noopener noreferrer" className={s.btn}>
					<TelegramIcon className={s.icon} />
				</a>
			</div>

			<p>© 2026 Vladimir Samarin</p>
		</footer>
	)
}

export default Footer
