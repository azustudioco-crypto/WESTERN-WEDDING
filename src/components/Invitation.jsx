import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Invitation() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
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
        padding: '48px 32px 64px',
        textAlign: 'center',
      }}
    >
      <p style={{
        fontFamily: '"adobe-caslon-pro", serif',
        fontStyle: 'italic',
        fontSize: '17px',
        color: '#2A1A0E',
        maxWidth: '340px',
        margin: '0 auto 8px',
        lineHeight: 1.7,
      }}>
        Tenemos el honor de invitarlos a nuestro matrimonio
      </p>
      <p style={{
        fontFamily: '"adobe-caslon-pro", serif',
        fontStyle: 'italic',
        fontSize: '17px',
        color: '#2A1A0E',
        lineHeight: 1.7,
      }}>
        que se llevará a cabo el día:
      </p>

      <div style={{
        width: '80%',
        height: '1px',
        background: '#6B3A2A',
        opacity: 0.2,
        margin: '24px auto',
      }} />

      {/* Date / time block */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '32px',
      }}>
        <div ref={leftRef} style={{ textAlign: 'center', opacity: 0 }}>
          <p style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#C47A3A',
          }}>
            Mayo
          </p>
          <p style={{
            fontFamily: '"thornwood", serif',
            fontSize: '52px',
            color: '#6B3A2A',
            lineHeight: 1,
          }}>
            23
          </p>
        </div>

        <div style={{
          width: '1px',
          height: '60px',
          background: '#6B3A2A',
          opacity: 0.25,
          alignSelf: 'center',
          flexShrink: 0,
        }} />

        <div ref={rightRef} style={{ textAlign: 'center', opacity: 0 }}>
          <p style={{
            fontFamily: '"thornwood", serif',
            fontSize: '52px',
            color: '#6B3A2A',
            lineHeight: 1,
          }}>
            1:30
          </p>
          <p style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#C47A3A',
          }}>
            P.M.
          </p>
        </div>
      </div>
    </section>
  )
}
