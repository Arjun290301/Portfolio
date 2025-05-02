import React from 'react'
import Noise from './Components/Noise/Noise'
import AppRoutes from './routes/Approuter'
import { BrowserRouter as Router } from "react-router-dom";
import About from './Components/about/About';
import SkillIcon from './Components/skill/SkillIcon';
import TimelineDemo from './Components/ui/TimelineDemo';
import Project from "./Components/Project/project";
import FooterContact from './Components/FooterContact/FooterContact';
import Navbar from './Components/NavBarComp/Navbar';



const App = () => {
  return <>
    <Router>
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={15}
      />
      <AppRoutes />
      <Navbar />
      <section id='about'>
        <About />
      </section>
      <section id='skills'>
        <SkillIcon />
      </section>
      <section id='timeline'>
        <TimelineDemo />
      </section>
      <section id='projects'>
        <Project />
      </section>
      <section id='contact'>
        <FooterContact />
      </section>
    </Router>


  </>
}

export default App
