import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import monogram from '../assets/illustrations/JVMONOGRAM.png'

gsap.registerPlugin(ScrollTrigger)

export default function RSVPButton() {
  const sectionRef = useRef(null)
  const monogramRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(monogramRef.current,
        { scale: 0.8, rotation: 360, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: monogramRef.current, start: 'top 85%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#6B3A2A', padding: '72px 28px', textAlign: 'center' }}
    >
      <img
        ref={monogramRef}
        src={monogram}
        alt="JV"
        style={{
          width: '58px',
          mixBlendMode: 'screen',
          display: 'block',
          margin: '0 auto 22px',
          opacity: 0,
        }}
      />

      <p style={{
        fontFamily: '"thornwood", serif',
        fontSize: '40px',
        color: '#FEFAF4',
        textAlign: 'center',
      }}>
        ¿Nos acompañas?
      </p>

      <span style={{
        fontFamily: '"adobe-caslon-pro", serif',
        fontStyle: 'italic',
        fontSize: '16px',
        color: '#D4B896',
        display: 'block',
        margin: '10px auto 36px',
      }}>
        Te esperamos con el corazón abierto
      </span>

      <a
        href="https://tally.so/r/D4xd6X"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '300px',
          margin: '0 auto',
          background: '#FEFAF4',
          color: '#6B3A2A',
          padding: '16px 40px',
          textDecoration: 'none',
          fontFamily: '"Jost", sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          cursor: 'pointer',
          textAlign: 'center',
          animation: 'weddingPulse 2.5s ease-in-out infinite',
          transition: 'background 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#D4B896'
          e.currentTarget.style.animation = 'none'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = '#FEFAF4'
          e.currentTarget.style.animation = 'weddingPulse 2.5s ease-in-out infinite'
        }}
      >
        Confirmar asistencia →
      </a>

      <span style={{
        fontFamily: '"Jost", sans-serif',
        fontWeight: 300,
        fontSize: '10px',
        color: '#D4B896',
        opacity: 0.5,
        display: 'block',
        marginTop: '18px',
      }}>
        Fecha límite: 15 de mayo de 2026
      </span>
    </section>
  )
}
