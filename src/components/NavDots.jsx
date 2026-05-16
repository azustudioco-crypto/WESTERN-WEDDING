import { useRef, useState, useEffect } from 'react'

export default function NavDots({ sectionIds, labels }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = e => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionIds.findIndex(
              id => document.getElementById(id) === entry.target
            )
            if (idx >= 0) setActiveIndex(idx)
          }
        })
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  if (!isDesktop) return null

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Navegación por secciones"
      style={{
        position: 'fixed',
        right: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        gap: '11px',
      }}
    >
      {sectionIds.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={labels[i]}
          style={{
            position: 'relative',
            width: i === activeIndex ? '9px' : '7px',
            height: i === activeIndex ? '9px' : '7px',
            borderRadius: '50%',
            background: i === activeIndex ? '#6B3A2A' : 'transparent',
            border: i === activeIndex
              ? '0.7px solid #6B3A2A'
              : '0.7px solid rgba(107,58,42,0.4)',
            cursor: 'pointer',
            padding: 0,
            transform: i === activeIndex ? 'scale(1.25)' : 'scale(1)',
            transition: 'all 0.3s ease',
            outline: 'none',
          }}
          onMouseEnter={e => {
            const tip = e.currentTarget.querySelector('.nav-tip')
            if (tip) tip.style.opacity = '1'
          }}
          onMouseLeave={e => {
            const tip = e.currentTarget.querySelector('.nav-tip')
            if (tip) tip.style.opacity = '0'
          }}
        >
          <span
            className="nav-tip"
            style={{
              position: 'absolute',
              right: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(42,26,14,0.88)',
              color: '#FEFAF4',
              fontFamily: '"Jost", sans-serif',
              fontSize: '8px',
              padding: '3px 10px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'opacity 0.2s',
              pointerEvents: 'none',
              letterSpacing: '0.05em',
            }}
          >
            {labels[i]}
          </span>
        </button>
      ))}
    </nav>
  )
}
