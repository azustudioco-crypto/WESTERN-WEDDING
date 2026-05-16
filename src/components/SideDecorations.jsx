import { useState, useEffect } from 'react'
import boots from '../assets/illustrations/boots.png'
import rope  from '../assets/illustrations/rope.png'

export default function SideDecorations() {
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)')
    setIsWide(mq.matches)
    const handler = e => setIsWide(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (!isWide) return null

  return (
    <>
      <img
        src={boots}
        alt=""
        style={{
          position: 'fixed',
          bottom: '15%',
          left: '-5px',
          width: '88px',
          mixBlendMode: 'multiply',
          opacity: 0.07,
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'float 5s ease-in-out infinite',
        }}
      />
      <img
        src={rope}
        alt=""
        style={{
          position: 'fixed',
          top: '40%',
          right: '-10px',
          width: '98px',
          mixBlendMode: 'multiply',
          opacity: 0.07,
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'float 6s ease-in-out 1.2s infinite',
        }}
      />
    </>
  )
}
