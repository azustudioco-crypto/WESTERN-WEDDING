import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import rings from '../assets/illustrations/rings.png'

gsap.registerPlugin(ScrollTrigger)

export default function Gifts() {
  const sectionRef = useRef(null)
  const ringsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ringsRef.current,
        { rotation: -10, opacity: 0 },
        {
          rotation: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ringsRef.current, start: 'top 85%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F2EDE3', padding: '80px 28px', textAlign: 'center' }}
    >
      <img
        ref={ringsRef}
        src={rings}
        alt=""
        style={{
          width: '76px',
          mixBlendMode: 'multiply',
          display: 'block',
          margin: '0 auto 24px',
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
        Un detalle especial
      </p>

      <p style={{
        fontFamily: '"thornwood", serif',
        fontSize: '34px',
        color: '#6B3A2A',
        marginTop: '8px',
      }}>
        Lluvia de sobres
      </p>

      <div style={{
        width: '50px',
        height: '1px',
        background: '#6B3A2A',
        opacity: 0.2,
        margin: '20px auto',
      }} />

      <p style={{
        fontFamily: '"adobe-caslon-pro", serif',
        fontStyle: 'italic',
        fontSize: '16px',
        color: '#8B6040',
        maxWidth: '340px',
        margin: '0 auto',
        lineHeight: 1.8,
      }}>
        Si deseas hacernos un regalo, la lluvia de sobres
        es nuestra preferida. Tu presencia ya es nuestro
        mayor regalo.
      </p>
    </section>
  )
}
