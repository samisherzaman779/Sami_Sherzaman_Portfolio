import React from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

// return ke andar, sab se neeche (closing tag se pehle):


function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </>
  )
}

export default App
