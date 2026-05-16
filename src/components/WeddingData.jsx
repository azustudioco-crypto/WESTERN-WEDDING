import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import illustration from '../assets/illustrations/JVILLUSTRATION.png'
import horseshoes from '../assets/illustrations/horseshoes.png'

gsap.registerPlugin(ScrollTrigger)

export default function WeddingData() {
  const sectionRef = useRef(null)
  const illustrationRef = useRef(null)
  const horseshoesRef = useRef(null)
  const paraRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(illustrationRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: illustrationRef.current, start: 'top 85%', once: true },
        }
      )

      gsap.fromTo(horseshoesRef.current,
        { rotation: -10, opacity: 0 },
        {
          rotation: 0, opacity: 0.65, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: horseshoesRef.current, start: 'top 85%', once: true },
        }
      )

      gsap.fromTo(paraRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: paraRef.current, start: 'top 88%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#F2EDE3',
        padding: '80px 32px',
        textAlign: 'center',
      }}
    >
      <img
        ref={illustrationRef}
        src={illustration}
        alt=""
        style={{
          maxWidth: '190px',
          width: '100%',
          mixBlendMode: 'multiply',
          display: 'block',
          margin: '0 auto 44px',
          opacity: 0,
        }}
      />

      <p style={{
        fontFamily: '"Jost", sans-serif',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.35em',
        color: '#C47A3A',
        marginBottom: '28px',
      }}>
        Con la bendición de nuestros padres
      </p>

      {/* Parents */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '48px',
        flexWrap: 'wrap',
        rowGap: '22px',
        marginBottom: '12px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: '"adobe-caslon-pro", serif',
            fontStyle: 'italic',
            fontSize: '19px',
            color: '#6B3A2A',
          }}>
            Sandra y Óscar
          </p>
          <p style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: '8px',
            textTransform: 'uppercase',
            color: '#C47A3A',
            opacity: 0.7,
            letterSpacing: '0.12em',
            marginTop: '4px',
          }}>
            Padres de la novia
          </p>
        </div>

        <div style={{
          width: '1px',
          height: '44px',
          background: '#D4B896',
          opacity: 0.4,
          flexShrink: 0,
          display: 'none',
        }}
          className="parents-divider"
        />

        <style>{`
          @media (min-width: 640px) { .parents-divider { display: block !important; } }
        `}</style>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: '"adobe-caslon-pro", serif',
            fontStyle: 'italic',
            fontSize: '19px',
            color: '#6B3A2A',
          }}>
            Ligia y Honorio
          </p>
          <p style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: '8px',
            textTransform: 'uppercase',
            color: '#C47A3A',
            opacity: 0.7,
            letterSpacing: '0.12em',
            marginTop: '4px',
          }}>
            Padres del novio
          </p>
        </div>
      </div>

      <img
        ref={horseshoesRef}
        src={horseshoes}
        alt=""
        style={{
          width: '52px',
          mixBlendMode: 'multiply',
          display: 'block',
          margin: '36px auto',
          opacity: 0,
        }}
      />

      {/* Names */}
      <span style={{
        fontFamily: '"thornwood", serif',
        fontSize: 'clamp(40px, 11vw, 60px)',
        color: '#6B3A2A',
        display: 'block',
      }}>
        Valentina
      </span>
      <span style={{
        fontFamily: '"Pinyon Script", cursive',
        fontSize: 'clamp(38px, 10vw, 52px)',
        color: '#C47A3A',
        lineHeight: 0.85,
        display: 'block',
      }}>
        &
      </span>
      <span style={{
        fontFamily: '"thornwood", serif',
        fontSize: 'clamp(40px, 11vw, 60px)',
        color: '#6B3A2A',
        display: 'block',
      }}>
        Juan David
      </span>

      <div style={{
        width: '70px',
        height: '1px',
        background: '#6B3A2A',
        opacity: 0.25,
        margin: '22px auto',
      }} />

      {/* Romantic message */}
      <p
        ref={paraRef}
        style={{
          fontFamily: '"adobe-caslon-pro", serif',
          fontStyle: 'italic',
          fontSize: 'clamp(15px, 4vw, 17px)',
          color: '#2A1A0E',
          lineHeight: 1.85,
          maxWidth: '480px',
          margin: '0 auto',
          opacity: 0,
          padding: '0 8px',
        }}
      >
        En el camino de la vida, encontrarse es el regalo más grande.
        Hemos recorrido cada paso juntos, y hoy queremos darte las
        gracias por caminar con nosotros. Te invitamos a ser parte del
        momento más importante de nuestras vidas, el día en que
        prometemos amarnos para siempre. Tu presencia lo hace todo más especial.
      </p>
    </section>
  )
}
