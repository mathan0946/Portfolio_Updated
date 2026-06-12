import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* A button/link that gently leans toward the cursor — subtle, premium. */
export default function Magnetic({ as = 'a', strength = 0.35, children, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = motion[as] || motion.a
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
