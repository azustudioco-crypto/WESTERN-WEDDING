import { useRef } from 'react'
import { gsap } from 'gsap'
import sello from '../assets/illustrations/sello.png'

export default function Intro({ onOpen }) {
  const bgRef = useRef(null)
  const envelopeRef = useRef(null)
  const topFlapRef = useRef(null)
  const monogramRef = useRef(null)
  const hasClicked = useRef(false)

  const handleClick = () => {
    if (hasClicked.current) return
    hasClicked.current = true

    if (envelopeRef.current) {
      envelopeRef.current.style.transition = 'none'
    }

    const tl = gsap.timeline()

    tl.to(topFlapRef.current, {
      rotationX: -180,
      duration: 0.7,
      ease: 'power2.inOut',
      transformOrigin: 'top center',
    })

    tl.to(monogramRef.current, {
      scale: 0.7,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, 0.25)

    tl.to(envelopeRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }, 0.65)

    tl.to(bgRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => setTimeout(onOpen, 100),
    }, 1.0)
  }

  return (
    <div
      ref={bgRef}
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#2A1A0E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        cursor: 'pointer',
      }}
    >
      {/* Envelope */}
      <div
        ref={envelopeRef}
        style={{
          position: 'relative',
          width: '280px',
          height: '195px',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          perspective: '600px',
        }}
        onMouseEnter={e => {
          if (!hasClicked.current) {
            e.currentTarget.style.transform = 'translateY(-8px) rotate(1.5deg)'
          }
        }}
        onMouseLeave={e => {
          if (!hasClicked.current) {
            e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'
          }
        }}
      >
        {/* Envelope body */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #E8D5B0 0%, #D4B896 25%, #C9A87A 55%, #E8D5B0 100%)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.45), 0 18px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
          border: '0.5px solid rgba(160,120,60,0.35)',
          borderRadius: '2px',
        }} />

        {/* Decorative flaps (left, right, bottom) + fold lines */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
          viewBox="0 0 280 195"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 0,195 140,97.5" fill="#DCCA90" />
          <polygon points="280,0 140,97.5 280,195" fill="#DCCA90" />
          <polygon points="0,195 280,195 140,97.5" fill="#DCCA90" />
          <line x1="0" y1="0" x2="140" y2="97.5" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
          <line x1="280" y1="0" x2="140" y2="97.5" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
          <line x1="0" y1="195" x2="140" y2="97.5" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
          <line x1="280" y1="195" x2="140" y2="97.5" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
        </svg>

        {/* Top flap (animates open) */}
        <div
          ref={topFlapRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'top center',
            zIndex: 2,
            backfaceVisibility: 'hidden',
          }}
        >
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 280 195"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 280,0 140,97.5" fill="#DCCA90" />
            <line x1="0" y1="0" x2="140" y2="97.5" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
            <line x1="280" y1="0" x2="140" y2="97.5" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
          </svg>
        </div>

        {/* Wax seal */}
        <img
          ref={monogramRef}
          src={sello}
          alt="Sello"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '110px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Text below envelope */}
      <p style={{
        fontFamily: '"Pinyon Script", cursive',
        fontSize: '26px',
        color: '#D4B896',
        textAlign: 'center',
        marginTop: '36px',
        pointerEvents: 'none',
      }}>
        Esta invitación es exclusiva para ti
      </p>

      <p style={{
        fontFamily: '"Jost", sans-serif',
        fontSize: '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.4em',
        color: '#C47A3A',
        marginTop: '14px',
        animation: 'pulse 2.2s ease-in-out infinite',
        pointerEvents: 'none',
      }}>
        Toca para abrir
      </p>
    </div>
  )
}
