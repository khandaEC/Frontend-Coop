import Slidebar from "../componentes/Slidebar"

function AppLayout({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <Slidebar />
        <section className=" ml-11">
          {children}
        </section>

      </div>
    </>
  )
}

export default AppLayout