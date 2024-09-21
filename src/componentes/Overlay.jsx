
function Overlay({ children, onClick }) {
  return(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50 z-40" onClick={onClick}></div>
        {children}
    </div>
  )
}

export default Overlay;