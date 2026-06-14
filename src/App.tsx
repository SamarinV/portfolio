import Background from './components/Background/Background'
import NavigationBar from './components/NavigationBar/NavigationBar'
import About from './sections/About/About'
import Footer from './sections/Footer/Footer'
import Hero from './sections/Hero/Hero'
import Projects from './sections/Projects/Projects'

function App() {
	return (
		<>
			<Background />
			<Hero />
			<NavigationBar />
			<About />
			<Projects />
			<Footer />
		</>
	)
}

export default App
