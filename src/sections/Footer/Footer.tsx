import GitHubIcon from '../../assets/social/github.svg?react'
import TelegramIcon from '../../assets/social/telegram.svg?react'
import VkIcon from '../../assets/social/vk.svg?react'
import ToTopIcon from '../../assets/toTop.svg?react'
import s from './Footer.module.scss'

const Footer = () => {
	const openVK = () => {
		const appLink = 'vk://vk.com/samarinva'
		const webLink = 'https://vk.com/samarinva'

		window.location.href = appLink

		setTimeout(() => {
			window.open(webLink, '_blank')
		}, 700)
	}
	return (
		<footer className={s.footer}>
			<a href={`#hero`} className={s.toHero}>
				<ToTopIcon className={s.toTopIcon} />
			</a>
			<div className={s.btns}>
				<a href="https://github.com/SamarinV" target="_blank" rel="noopener noreferrer" className={s.btn}>
					<GitHubIcon className={s.icon} />
				</a>

				<a href="https://t.me/vova_samar" target="_blank" rel="noopener noreferrer" className={s.btn}>
					<TelegramIcon className={s.icon} />
				</a>
				<a
					href="https://m.vk.com/samarinva"
					onClick={(e) => {
						e.preventDefault()
						openVK()
					}}
					target="_blank"
					rel="noopener noreferrer"
					className={s.btn}
				>
					<VkIcon className={s.icon} />
				</a>
			</div>

			<p>© 2026 Vladimir Samarin</p>
		</footer>
	)
}

export default Footer
