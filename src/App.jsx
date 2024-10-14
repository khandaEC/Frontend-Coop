import { BrowserRouter, Routes } from "react-router-dom"
import { renderRoutes, routes } from './routes'
import { AuthProvider } from './componentes/AuthProvider'
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {renderRoutes(routes)}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
