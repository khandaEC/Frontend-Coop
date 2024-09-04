import Slidebar from "../componentes/Slidebar"

function AppLayout({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <Slidebar />
        {children}
      </div>
    </>
  )
}

export default AppLayout