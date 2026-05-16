import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NoKids() {
  const sectionRef = useRef(null)
  const archRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(archRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: archRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#FEFAF4', padding: '64px 28px', textAlign: 'center' }}
    >
      <div
        ref={archRef}
        style={{
          width: '85%',
          maxWidth: '340px',
          margin: '0 auto',
          background: '#2A1A0E',
          borderRadius: '50% 50% 0 0 / 40% 40% 0 0',
          padding: '44px 32px 36px',
          boxShadow: '0 8px 40px rgba(42,26,14,0.2)',
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: '"adobe-caslon-pro", serif',
          fontStyle: 'italic',
          fontSize: '16px',
          color: '#FEFAF4',
          lineHeight: 1.85,
          textAlign: 'center',
        }}>
          Adoramos a los pequeños, sin embargo
          <br />
          esta celebración está destinada solo para adultos.
          <br />
          ¡Agradecemos su comprensión!
        </p>
      </div>

      <p style={{
        fontFamily: '"thornwood", serif',
        fontSize: '26px',
        color: '#6B3A2A',
        letterSpacing: '0.18em',
        marginTop: '20px',
      }}>
        NO NIÑOS
      </p>
    </section>
  )
}
