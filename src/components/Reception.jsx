import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import piedrasblancas from '../assets/illustrations/piedrasblancas.png'

gsap.registerPlugin(ScrollTrigger)

export default function Reception() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1, opacity: 0.9, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 85%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} style={{ background: '#2A1A0E', padding: '72px 28px', textAlign: 'center' }}>
      <img
        ref={imgRef}
        src={piedrasblancas}
        alt=""
        style={{
          maxWidth: '230px',
          width: '100%',
          mixBlendMode: 'screen',
          display: 'block',
          margin: '0 auto 20px',
          opacity: 0,
        }}
      />

      <p style={{
        fontFamily: '"Jost", sans-serif',
        fontSize: '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.35em',
        color: '#C47A3A',
      }}>
        Recepción
      </p>

      <p style={{
        fontFamily: '"thornwood", serif',
        fontSize: '24px',
        color: '#FEFAF4',
        marginTop: '6px',
      }}>
        Hacienda Piedras Blancas
      </p>

      <p style={{
        fontFamily: '"adobe-caslon-pro", serif',
        fontStyle: 'italic',
        fontSize: '15px',
        color: 'rgba(212,184,150,0.7)',
        marginTop: '4px',
      }}>
        Guarne, Antioquia
      </p>

      <div style={{
        width: '50px',
        height: '1px',
        background: '#D4B896',
        opacity: 0.25,
        margin: '18px auto',
      }} />

      <p style={{
        fontFamily: '"adobe-caslon-pro", serif',
        fontStyle: 'italic',
        fontSize: '15px',
        color: '#D4B896',
      }}>
        A continuación de la ceremonia · 4:30 PM
      </p>

      <a
        href="https://maps.app.goo.gl/MtBCkT5va7T2Bv4j9"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          width: 'fit-content',
          margin: '20px auto 0',
          border: '1px solid rgba(212,184,150,0.4)',
          padding: '10px 24px',
          fontFamily: '"Jost", sans-serif',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: '#D4B896',
          background: 'transparent',
          textDecoration: 'none',
          transition: 'background 0.25s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,184,150,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        Ver ubicación →
      </a>
    </div>
  )
}
