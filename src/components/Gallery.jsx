import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import foto3  from '../assets/photos/foto3.jpeg'
import foto4  from '../assets/photos/foto4.jpeg'
import foto5  from '../assets/photos/foto5.jpeg'
import foto6  from '../assets/photos/foto6.jpeg'
import foto7  from '../assets/photos/foto7.jpeg'
import foto8  from '../assets/photos/foto8.jpeg'

gsap.registerPlugin(ScrollTrigger)

const PHOTOS = [foto3, foto4, foto5, foto6, foto7, foto8]

export default function Gallery() {
  const sectionRef = useRef(null)
  const imgRefs = useRef([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const prev = useCallback(() =>
    setLightboxIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const next = useCallback(() =>
    setLightboxIndex(i => (i + 1) % PHOTOS.length), [])
  const close = useCallback(() => setLightboxOpen(false), [])

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = e => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, close, next, prev])

  useEffect(() => {
    const ctx = gsap.context(() => {
      imgRefs.current.forEach((img, i) => {
        gsap.fromTo(img,
          { scale: 0.92, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.07,
            scrollTrigger: { trigger: img, start: 'top 90%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#2A1A0E', padding: '72px 20px' }}
    >
      <span style={{
        fontFamily: '"Pinyon Script", cursive',
        fontSize: '56px',
        color: '#D4B896',
        display: 'block',
        textAlign: 'center',
        marginBottom: '40px',
      }}>
        Galería de Fotos
      </span>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        {PHOTOS.map((src, i) => (
          <img
            key={i}
            ref={el => imgRefs.current[i] = el}
            src={src}
            alt={`Foto ${i + 1}`}
            onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'cover',
              aspectRatio: '3/4',
              filter: 'grayscale(100%) contrast(1.06) sepia(12%)',
              border: '2px solid rgba(212,184,150,0.1)',
              cursor: 'pointer',
              transition: 'all 0.5s ease',
              opacity: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.filter = 'grayscale(15%) sepia(45%) brightness(1.08)'
              e.currentTarget.style.transform = 'scale(1.02)'
              e.currentTarget.style.borderColor = 'rgba(212,184,150,0.45)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.filter = 'grayscale(100%) contrast(1.06) sepia(12%)'
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.borderColor = 'rgba(212,184,150,0.1)'
            }}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(42,26,14,0.96)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close */}
          <button
            onClick={close}
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#D4B896',
              fontSize: '28px',
              cursor: 'pointer',
              lineHeight: 1,
              zIndex: 201,
            }}
          >
            ×
          </button>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            style={{
              position: 'absolute',
              left: '16px',
              background: 'none',
              border: '1px solid rgba(212,184,150,0.4)',
              color: '#D4B896',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '10px 16px',
              zIndex: 201,
            }}
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={PHOTOS[lightboxIndex]}
            alt=""
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '88vh',
              objectFit: 'contain',
              filter: 'grayscale(100%) contrast(1.06) sepia(12%)',
            }}
          />

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); next() }}
            style={{
              position: 'absolute',
              right: '16px',
              background: 'none',
              border: '1px solid rgba(212,184,150,0.4)',
              color: '#D4B896',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '10px 16px',
              zIndex: 201,
            }}
          >
            ›
          </button>

          {/* Counter */}
          <p style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: '"Jost", sans-serif',
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'rgba(212,184,150,0.6)',
          }}>
            {lightboxIndex + 1} / {PHOTOS.length}
          </p>
        </div>
      )}
    </section>
  )
}
