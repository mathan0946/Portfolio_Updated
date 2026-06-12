import { motion } from 'framer-motion'
import { profile } from '../data/content'
import Magnetic from './Magnetic'
import './Hero.css'

const line = {
  hidden: { opacity: 0, y: '0.6em' },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        {/* Left — portrait + identity */}
        <motion.aside
          className="hero__rail"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero__portrait"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="hero__portrait-ring" aria-hidden />
            <img src={profile.portrait} alt={`Portrait of ${profile.name}`} loading="eager" />
            <span className="hero__portrait-tag">
              <span className="hero__portrait-dot" /> Open to work
            </span>
          </motion.div>

          <div className="hero__id">
            <span className="eyebrow">{profile.role}</span>
            <p className="hero__id-loc">{profile.location}</p>
          </div>
        </motion.aside>

        {/* Right — the manifesto */}
        <div className="hero__lead">
          <h1 className="hero__headline" aria-label={profile.manifesto.join(' ')}>
            {profile.manifesto.map((l, i) => (
              <span className="hero__line" key={i}>
                <motion.span
                  className="hero__line-inner"
                  custom={i}
                  variants={line}
                  initial="hidden"
                  animate="show"
                >
                  {i === 1 ? <em>{l}</em> : l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__intro"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Magnetic href="#work" className="btn btn--primary">
              See the work
              <span className="btn__arrow" aria-hidden>↓</span>
            </Magnetic>
            <Magnetic href={profile.github} target="_blank" rel="noreferrer" className="btn btn--ghost">
              GitHub
              <span aria-hidden>↗</span>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            {profile.stats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        <span>scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
