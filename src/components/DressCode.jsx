import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import boots from '../assets/illustrations/boots.png'

gsap.registerPlugin(ScrollTrigger)

const PALETTE = ['#2A1A0E', '#6B3A2A', '#C47A3A', '#D4B896', '#F2EDE3']

export default function DressCode() {
  const sectionRef = useRef(null)
  const bootsRef = useRef(null)
  const circleRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bootsRef.current,
        { rotation: -10, opacity: 0 },
        {
          rotation: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: bootsRef.current, start: 'top 85%', once: true },
        }
      )

      circleRefs.current.forEach((c, i) => {
        gsap.fromTo(c,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)', delay: i * 0.08,
            scrollTrigger: { trigger: c, start: 'top 90%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F2EDE3', padding: '72px 28px', textAlign: 'center' }}
    >
      <img
        ref={bootsRef}
        src={boots}
        alt=""
        style={{
          width: '110px',
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
        Dress Code
      </p>

      <p style={{
        fontFamily: '"thornwood", serif',
        fontSize: '30px',
        color: '#6B3A2A',
        marginTop: '8px',
      }}>
        Formal Temática Texana
      </p>

      <p style={{
        fontFamily: '"adobe-caslon-pro", serif',
        fontStyle: 'italic',
        fontSize: '16px',
        color: '#8B6040',
        marginTop: '10px',
      }}>
        Botas y sombrero son bienvenidos
      </p>

      {/* Color palette circles */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        margin: '28px auto 0',
      }}>
        {PALETTE.map((color, i) => (
          <div
            key={color}
            ref={el => circleRefs.current[i] = el}
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: color,
              border: '0.5px solid rgba(42,26,14,0.2)',
              opacity: 0,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}
