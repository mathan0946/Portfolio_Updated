import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/content'
import './Nav.css'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'archive', label: 'Archive' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('top')
  const [open, setOpen] = useState(false)

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const ids = ['top', ...LINKS.map((l) => l.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <button className="nav__brand" onClick={() => go('top')}>
            <span className="nav__mark">MG</span>
            <span className="nav__name">{profile.shortName}</span>
          </button>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`nav__link ${active === l.id ? 'is-active' : ''}`}
              >
                <span className="nav__num">0{i + 1}</span>
                {l.label}
              </button>
            ))}
          </nav>

          <button
            className="nav__menu"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className={`nav__burger ${open ? 'is-open' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((l, i) => (
              <button key={l.id} onClick={() => go(l.id)} className="nav__sheet-link">
                <span className="nav__num">0{i + 1}</span>
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
