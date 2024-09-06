
function IconFechaAtras({ width, height, color, rotar }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: rotar }}
    >
      <path d="M20 8.70248H4.15771L9.90659 1.8347L8.37081 0L0 10L8.37081 20L9.90659 18.1653L4.15771 11.2975H20V8.70248Z" fill={color} />
    </svg>
  )
}

export default IconFechaAtras;