export default function FullPhoto({ src, position = 'center center' }) {
  return (
    <div style={{ lineHeight: 0 }}>
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: 'min(55vw, 420px)',
          objectFit: 'cover',
          objectPosition: position,
          filter: 'grayscale(100%) contrast(1.05) sepia(12%)',
          display: 'block',
        }}
      />
    </div>
  )
}
