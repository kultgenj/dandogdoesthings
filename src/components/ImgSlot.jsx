/**
 * Photo placeholder — swap out for a real <img> once photos are available.
 * Props:
 *   src      — image path (if provided, renders a real img instead of placeholder)
 *   alt      — describes what photo goes here (shown as label in placeholder mode)
 *   variant  — extra CSS class string (e.g. "img-slot--portrait img-slot--blue")
 *   style    — optional inline style object
 *   className — extra class on the wrapper
 *   onClick  — click handler
 */
export default function ImgSlot({ src, alt, variant = '', style = {}, className = '', onClick }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
        onClick={onClick}
      />
    )
  }

  return (
    <div
      className={`img-slot ${variant} ${className}`}
      style={style}
      onClick={onClick}
      title={alt}
    >
      <span className="img-slot__icon">📸</span>
      <span className="img-slot__label">{alt}</span>
    </div>
  )
}
