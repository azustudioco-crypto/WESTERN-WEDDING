import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TARGET = new Date('2026-05-23T13:30:00')

function calcTime() {
  const diff = TARGET - new Date()
  if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return {
    days:    String(d).padStart(2, '0'),
    hours:   String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  }
}

export default function Countdown() {
  const [time, setTime] = useState(calcTime)
  const sectionRef = useRef(null)
  const archRef = useRef(null)
  const quadRefs = useRef([])

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(archRef.current,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: archRef.current, start: 'top 80%', once: true },
        }
      )

      quadRefs.current.forEach((q, i) => {
        gsap.fromTo(q,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)', delay: i * 0.1,
            scrollTrigger: { trigger: archRef.current, start: 'top 75%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const numStyle = {
    fontFamily: '"adobe-caslon-pro", serif',
    fontStyle: 'italic',
    fontSize: 'clamp(44px, 11vw, 64px)',
    color: '#FEFAF4',
    lineHeight: 1,
    display: 'block',
    textAlign: 'center',
  }

  const labelStyle = {
    fontFamily: '"adobe-caslon-pro", serif',
    fontStyle: 'italic',
    fontSize: '14px',
    color: '#D4B896',
    display: 'block',
    textAlign: 'center',
    marginTop: '4px',
  }

  const units = [
    { val: time.days,    label: 'días' },
    { val: time.hours,   label: 'horas' },
    { val: time.minutes, label: 'minutos' },
    { val: time.seconds, label: 'segundos' },
  ]

  return (
    <section
      ref={sectionRef}
      style={{ background: '#FEFAF4', padding: '72px 28px', textAlign: 'center' }}
    >
      <div
        ref={archRef}
        style={{
          width: '90%',
          maxWidth: '380px',
          margin: '0 auto',
          background: '#2A1A0E',
          borderRadius: '50% 50% 0 0 / 40% 40% 0 0',
          padding: '44px 36px 44px',
          boxShadow: '0 8px 40px rgba(42,26,14,0.25)',
          opacity: 0,
        }}
      >
        <h2 style={{
          fontFamily: '"thornwood", serif',
          fontSize: '38px',
          color: '#FEFAF4',
          letterSpacing: '0.12em',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          FALTAN
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px 16px',
          marginBottom: '28px',
        }}>
          {units.map((u, i) => (
            <div
              key={u.label}
              ref={el => quadRefs.current[i] = el}
              style={{ opacity: 0 }}
            >
              <span style={numStyle}>{u.val}</span>
              <span style={labelStyle}>{u.label}</span>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: '"thornwood", serif',
          fontSize: '16px',
          color: '#FEFAF4',
          letterSpacing: '0.18em',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          PARA NUESTRA<br />BODA
        </p>
      </div>
    </section>
  )
}
