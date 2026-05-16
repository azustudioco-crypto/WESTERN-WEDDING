import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import rings from '../assets/illustrations/rings.png'
import cocktail from '../assets/illustrations/cocktail.png'
import dinner from '../assets/illustrations/dinner.png'
import notes from '../assets/illustrations/notes.png'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { label: 'CEREMONIA', time: '1:30 p.m.', icon: rings,   iconSize: 70, side: 'right' },
  { label: 'RECEPCIÓN', time: '4:30 p.m.', icon: cocktail, iconSize: 70, side: 'left'  },
  { label: 'CENA',      time: '6:00 p.m.', icon: dinner,  iconSize: 75, side: 'right' },
  { label: 'BAILE',     time: '7:00 p.m.', icon: notes,   iconSize: 70, side: 'left'  },
]

const labelStyle = {
  fontFamily: '"Jost", sans-serif',
  fontSize: '9px',
  textTransform: 'uppercase',
  letterSpacing: '0.3em',
  color: '#C47A3A',
}

const timeStyle = {
  fontFamily: '"adobe-caslon-pro", serif',
  fontStyle: 'italic',
  fontSize: '20px',
  color: '#6B3A2A',
  marginTop: '3px',
}

const dotStyle = {
  width: '12px',
  height: '12px',
  minWidth: '12px',
  background: '#C47A3A',
  borderRadius: '50%',
  border: '2px solid #F2EDE3',
  boxShadow: '0 0 0 4px rgba(196,122,58,0.18)',
}

export default function Timeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const iconRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade up
      gsap.fromTo('.timeline-title',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-title', start: 'top 85%', once: true },
        }
      )

      // Line grows as you scroll
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top' })
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true,
        onUpdate: self => {
          gsap.set(lineRef.current, { scaleY: self.progress })
        },
      })

      // Each item appears on scroll
      ITEMS.forEach((item, i) => {
        const el = itemRefs.current[i]
        const icon = iconRefs.current[i]
        if (!el || !icon) return

        const xFrom = item.side === 'right' ? 50 : -50

        gsap.fromTo(icon,
          { x: xFrom, opacity: 0 },
          {
            x: 0, opacity: 0.85, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        )
        gsap.fromTo(el,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F2EDE3', padding: '80px 28px' }}
    >
      <h2
        className="timeline-title"
        style={{
          fontFamily: '"thornwood", serif',
          fontSize: '28px',
          color: '#6B3A2A',
          textAlign: 'center',
          letterSpacing: '0.15em',
          marginBottom: '56px',
          opacity: 0,
        }}
      >
        ITINERARIO
      </h2>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          maxWidth: '520px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {/* Vertical line */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: 'calc(50% - 0.75px)',
            top: 0,
            height: '100%',
            width: '1.5px',
            background: 'linear-gradient(to bottom, transparent, #C47A3A 8%, #C47A3A 92%, transparent)',
            transformOrigin: 'top',
            zIndex: 0,
          }}
        />

        {ITEMS.map((item, i) => (
          <div
            key={i}
            ref={el => itemRefs.current[i] = el}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              marginBottom: i < ITEMS.length - 1 ? '52px' : 0,
              position: 'relative',
              zIndex: 1,
              opacity: 0,
            }}
          >
            {item.side === 'right' ? (
              <>
                {/* Text left */}
                <div style={{ textAlign: 'right', paddingRight: '24px' }}>
                  <p style={labelStyle}>{item.label}</p>
                  <p style={timeStyle}>{item.time}</p>
                </div>

                <div style={dotStyle} />

                {/* Icon right */}
                <div style={{ paddingLeft: '24px' }}>
                  <img
                    ref={el => iconRefs.current[i] = el}
                    src={item.icon}
                    alt={item.label}
                    style={{
                      width: `${item.iconSize}px`,
                      mixBlendMode: 'multiply',
                      opacity: 0,
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Icon left */}
                <div style={{ textAlign: 'right', paddingRight: '24px' }}>
                  <img
                    ref={el => iconRefs.current[i] = el}
                    src={item.icon}
                    alt={item.label}
                    style={{
                      width: `${item.iconSize}px`,
                      mixBlendMode: 'multiply',
                      opacity: 0,
                      marginLeft: 'auto',
                      display: 'block',
                    }}
                  />
                </div>

                <div style={dotStyle} />

                {/* Text right */}
                <div style={{ paddingLeft: '24px' }}>
                  <p style={labelStyle}>{item.label}</p>
                  <p style={timeStyle}>{item.time}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Fun note below timeline */}
      <p style={{
        fontFamily: '"adobe-caslon-pro", serif',
        fontStyle: 'italic',
        fontSize: 'clamp(15px, 4vw, 18px)',
        color: '#8B6040',
        textAlign: 'center',
        maxWidth: '420px',
        margin: '48px auto 0',
        lineHeight: 1.75,
        padding: '0 8px',
      }}>
        La ceremonia es rápida. La rumba no...
        <br />
        así que trae energía, porque la fiesta es hasta tarde.
      </p>
    </section>
  )
}
