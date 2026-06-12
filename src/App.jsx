import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Archive from './components/Archive'
import Journey from './components/Journey'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import './App.css'

export default function App() {
  // Keep the document title honest if someone deep-links a hash
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace('#', '')
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Archive />
        <Journey />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
