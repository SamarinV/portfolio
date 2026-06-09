import AnimatedSection from "../../components/AnimatedSection/AnimatedSection";
import Title from "../../components/Title/Title";
import { projects } from "../../data/projects";
import s from './Projects.module.scss'

const Projects = () => {
	return (
		<AnimatedSection>
			<section className={s.projects} id="projects">
				<Title title="Проекты" />
				{projects.map((project) => (
					<div key={project.id}>
						<h3>{project.title}</h3>
					</div>
				))}
			</section>
		</AnimatedSection>
	)
}
 
export default Projects;