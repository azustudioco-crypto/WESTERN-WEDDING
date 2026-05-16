import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImg from '../assets/photos/hero.jpeg'
import monogram from '../assets/illustrations/JVMONOGRAM.png'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const monogramRef = useRef(null)
  const vRef = useRef(null)
  const ampRef = useRef(null)
  const jdRef = useRef(null)
  const dateRef = useRef(null)
  const arrowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(monogramRef.current,
        { opacity: 0, rotation: -5 },
        { opacity: 1, rotation: 0, duration: 1 },
        0.3
      )
      tl.fromTo(vRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0.3
      )
      tl.fromTo(ampRef.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7 },
        0.55
      )
      tl.fromTo(jdRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0.6
      )
      tl.fromTo(dateRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.8
      )

      // Bounce arrow
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 0.7,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
          gsap.set(imgRef.current, { y: self.progress * -80 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Hero photo */}
      <img
        ref={imgRef}
        src={heroImg}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 8%',
          filter: 'grayscale(100%) contrast(1.06) sepia(15%)',
          willChange: 'transform',
        }}
      />

      {/* Top overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(42,26,14,0.45) 0%, transparent 45%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Bottom overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(42,26,14,0.85) 0%, transparent 60%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 28px',
        textAlign: 'center',
      }}>
        <img
          ref={monogramRef}
          src={monogram}
          alt="JV"
          style={{
            width: '68px',
            mixBlendMode: 'screen',
            marginBottom: '16px',
            opacity: 0,
          }}
        />

        <h1
          ref={vRef}
          style={{
            fontFamily: '"thornwood", serif',
            fontSize: 'clamp(44px, 13vw, 82px)',
            color: '#FEFAF4',
            lineHeight: 0.88,
            opacity: 0,
          }}
        >
          Valentina
        </h1>

        <span
          ref={ampRef}
          style={{
            fontFamily: '"Pinyon Script", cursive',
            fontSize: 'clamp(40px, 10vw, 68px)',
            color: '#D4B896',
            lineHeight: 0.8,
            display: 'block',
            opacity: 0,
          }}
        >
          &
        </span>

        <h1
          ref={jdRef}
          style={{
            fontFamily: '"thornwood", serif',
            fontSize: 'clamp(44px, 13vw, 82px)',
            color: '#FEFAF4',
            lineHeight: 0.88,
            opacity: 0,
          }}
        >
          Juan David
        </h1>

        <div style={{
          width: '60px',
          height: '1px',
          background: '#D4B896',
          opacity: 0.55,
          margin: '18px auto',
        }} />

        <div ref={dateRef} style={{ opacity: 0 }}>
          <p style={{
            fontFamily: '"Jost", sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            letterSpacing: '0.42em',
            color: '#D4B896',
          }}>
            23 · 05 · 2026
          </p>
          <p style={{
            fontFamily: '"Jost", sans-serif',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.22em',
            color: 'rgba(212,184,150,0.6)',
            marginTop: '5px',
          }}>
            Rionegro &amp; Guarne · Antioquia
          </p>
        </div>
      </div>

      {/* Scroll arrow */}
      <div
        ref={arrowRef}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
          <path d="M2 2L12 12L22 2" stroke="#D4B896" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
