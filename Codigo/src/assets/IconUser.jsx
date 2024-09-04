
function IconUser({ width, height, color }) {
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z" stroke={color} strokeWidth="1.5" />
      <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke={color} strokeWidth="1.5" />
      <path d="M16.9691 19C16.81 16.1085 15.9247 14 10.9999 14C6.07521 14 5.18991 16.1085 5.03076 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default IconUser;