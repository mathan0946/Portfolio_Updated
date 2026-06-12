import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { archive, archiveCategories, profile } from '../data/content'
import './Archive.css'

const langColor = {
  Python: '#4b7fb0',
  TypeScript: '#3a6ea5',
  JavaScript: '#b8932f',
  Java: '#9a5b34',
  'C': '#6f7d5e',
  'C++': '#7d5e6f',
  Jupyter: '#bf5b32',
  HTML: '#bf5b32',
  Android: '#6f9a5b',
  Cloud: '#5b7d9a',
}

export default function Archive() {
  const [filter, setFilter] = useState('All')

  const counts = useMemo(() => {
    const c = { All: archive.length }
    archive.forEach((a) => { c[a.cat] = (c[a.cat] || 0) + 1 })
    return c
  }, [])

  const visible = filter === 'All' ? archive : archive.filter((a) => a.cat === filter)

  return (
    <section id="archive" className="section-pad archive">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow">The full archive</span>
          <h2>
            Everything else I’ve <em>built &amp; shipped</em>.
          </h2>
          <p className="lede">
            A working sample of {archive.length}+ public repositories — filter by what
            you care about, then dive into the code.
          </p>
        </header>

        {/* Filter chips */}
        <div className="archive__filters" role="tablist" aria-label="Filter projects">
          {archiveCategories.map((cat) => {
            const active = filter === cat
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                className={`fchip ${active ? 'is-active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {active && (
                  <motion.span
                    layoutId="fchip-bg"
                    className="fchip__bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="fchip__label">{cat}</span>
                <span className="fchip__count">{counts[cat] ?? 0}</span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="archive__grid">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.a
                  key={p.name}
                  layout
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rcard"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                >
                  <div className="rcard__top">
                    <span
                      className="rcard__lang"
                      style={{ '--lc': langColor[p.lang] || 'var(--ink-faint)' }}
                    >
                      <span className="rcard__lang-dot" />
                      {p.lang}
                    </span>
                    <span className="rcard__arrow" aria-hidden>↗</span>
                  </div>
                  <h3 className="rcard__name">{p.name}</h3>
                  <p className="rcard__desc">{p.desc}</p>
                  <div className="rcard__tags">
                    {p.tags.map((t) => (
                      <span key={t} className="rcard__tag">{t}</span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <div className="archive__more">
          <a href={profile.github} target="_blank" rel="noreferrer" className="archive__more-link">
            See all repositories on GitHub <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
