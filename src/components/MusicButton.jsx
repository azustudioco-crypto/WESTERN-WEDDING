import { useRef, useState, useEffect } from 'react'
import cancion from '../assets/music/quesuertetenertefonseca.mp3'
import notesIcon from '../assets/illustrations/notes.png'

export default function MusicButton() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      audioRef.current?.play().catch(() => {})
      setPlaying(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const toggle = e => {
    e.stopPropagation()
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src={cancion} />

      <button
        onClick={toggle}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '20px',
          zIndex: 50,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#6B3A2A',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(42,26,14,0.5)',
          animation: playing ? 'musicPulse 2s ease infinite' : 'none',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#2A1A0E'}
        onMouseLeave={e => e.currentTarget.style.background = '#6B3A2A'}
      >
        <img
          src={notesIcon}
          alt=""
          style={{
            width: '26px',
            mixBlendMode: 'screen',
            opacity: playing ? 1 : 0.5,
            transition: 'opacity 0.2s',
          }}
        />
      </button>
    </>
  )
}
