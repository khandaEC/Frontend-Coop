function IconFlechaDerecha({ width, height, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.2))" }} 
    >
      <path
        d="M10 5.5V0.5H12.5L20 8L12.5 15.5H10V10.5H0L0 5.5H10Z"
        fill={color}
        filter="url(#elevated)"
      />
    </svg>
  );
}

export default IconFlechaDerecha;
