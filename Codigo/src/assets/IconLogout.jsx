
function IconLogout({ width, height, color}) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 11.1111V8.88889H5V5.55556L0 10L5 14.4444V11.1111H14Z" fill={color}/>
      <path d="M18 0H9C7.897 0 7 0.996667 7 2.22222V6.66667H9V2.22222H18V17.7778H9V13.3333H7V17.7778C7 19.0033 7.897 20 9 20H18C19.103 20 20 19.0033 20 17.7778V2.22222C20 0.996667 19.103 0 18 0Z" fill={color} />
    </svg>
  )
}

export default IconLogout;