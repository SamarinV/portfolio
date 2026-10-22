import Background from './components/Background/Background'
import NavigationBar from './components/NavigationBar/NavigationBar'
import About from './sections/About/About'
import Footer from './sections/Footer/Footer'
import Hero from './sections/Hero/Hero'
import Projects from './sections/Projects/Projects'
import Contacts from './sections/Contacts/Contacts'

function App() {
	return (
		<>
			<Background />
			<NavigationBar />
			<main>
				<Hero />
				<About />
				<Projects />
				<Contacts />
			</main>
			<Footer />
		</>
	)
}

export default App
