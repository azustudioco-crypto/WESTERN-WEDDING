import foto9  from '../assets/photos/foto9.jpeg'
import foto10 from '../assets/photos/foto10.jpeg'

export default function FinalPhotos() {
  const photoStyle = {
    width: '100%',
    height: 'min(60vw, 480px)',
    objectFit: 'cover',
    objectPosition: 'center',
    filter: 'grayscale(100%) contrast(1.05) sepia(10%)',
    display: 'block',
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0,
      lineHeight: 0,
    }}>
      <img src={foto9}  alt="" style={photoStyle} />
      <img src={foto10} alt="" style={photoStyle} />
    </div>
  )
}
