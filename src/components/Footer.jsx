import monogram from '../assets/illustrations/JVMONOGRAM.png'

export default function Footer() {
  return (
    <footer style={{
      background: '#2A1A0E',
      padding: '60px 32px',
      textAlign: 'center',
    }}>
      <img
        src={monogram}
        alt="JV"
        style={{
          width: '56px',
          mixBlendMode: 'screen',
          display: 'block',
          margin: '0 auto 20px',
        }}
      />

      <p style={{
        fontFamily: '"thornwood", serif',
        fontSize: '15px',
        color: '#FEFAF4',
        letterSpacing: '0.28em',
      }}>
        VALENTINA &amp; JUAN DAVID
      </p>

      <p style={{
        fontFamily: '"Jost", sans-serif',
        fontWeight: 300,
        fontSize: '11px',
        color: '#D4B896',
        letterSpacing: '0.3em',
        marginTop: '8px',
      }}>
        23 · 05 · 2026
      </p>

      <p style={{
        fontFamily: '"Pinyon Script", cursive',
        fontSize: '34px',
        color: '#D4B896',
        marginTop: '14px',
      }}>
        Con amor, Valentina &amp; Juan David
      </p>
    </footer>
  )
}
