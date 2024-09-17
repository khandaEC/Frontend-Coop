import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BotonSlidebar from "./Atomos/BotonSlideBar";
import LogoCoop from "../assets/LogoCoop";
import IconHome from "../assets/IconHome";
import IconCreditos from "../assets/IconCreditos";
import IconAhorros from "../assets/IconAhorros";
import IconInteres from "../assets/IconInteres";
import IconAporte from "../assets/IconAporte";
import IconUser from "../assets/IconUser";
import IconLogout from "../assets/IconLogout";
import { PATH_DASHBOARD, PATH_INTERES_SOCIOS, PATH_CREDITOS, PATH_AHORROS, PATH_APORTE_SOCIOS } from '../routes/paths';

function Slidebar() {

  const location = useLocation();
  const [isHover, setIsHover] = useState(false);
  const [slideAbierta, setSlideAbierta] = useState(false);

  const links = [
    { nombre: 'Inicio', path: PATH_DASHBOARD, icon: <IconHome width={'25px'} height={'25px'} color={'white'} /> },
    { nombre: 'Ahorros', path: PATH_AHORROS, icon: <IconAhorros width={'25px'} height={'25px'} color={'white'} /> },
    { nombre: 'Créditos', path: PATH_CREDITOS, icon: <IconCreditos width={'25px'} height={'25px'} color={'white'} /> },
    { nombre: 'Interés de Socios', path: PATH_INTERES_SOCIOS, icon: <IconInteres width={'25px'} height={'25px'} color={'white'} /> },
    { nombre: 'Aporte de Socios', path: PATH_APORTE_SOCIOS, icon: <IconAporte width={'25px'} height={'25px'} color={'white'} /> },
  ]

  return (
    <>
      {slideAbierta && (
        <aside className="fixed top-0 left-0 h-screen w-[275px] bg-AzulSlide flex flex-col items-center justify-between p-5 animate-slideIn"
          onMouseLeave={() => setSlideAbierta(false)}
        >
          <div>
            <div className="flex items-center w-full h-[50px] gap-5 mb-[100px]">
              <span className="bg-RojoSlide px-[14px] py-[11px] rounded-[10px] shadow-3xl">
                <LogoCoop width={'20px'} height={'25px'} color={'white'} />
              </span>
              <span className="text-white font-bold">
                Coop. Ahorro y Crédito César Vásquez.
              </span>
            </div>
            <div>
              {links.map(({ nombre, path, icon }) => (
                <Link key={path} to={path}>
                  <BotonSlidebar
                    Texto={nombre}
                    Icono={icon}
                    activo={location.pathname === path}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center w-full h-[50px] gap-2 border-t pt-3 justify-between">
            <span >
              <IconUser width={'35px'} height={'35px'} color={'white'} />
            </span>
            <span className="text-white font-bold">
              Pepe Terán
            </span>
            <button
              className="hover:bg-white px-[14px] py-[11px] rounded-[10px] flex items-center justify-center"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <IconLogout
                width={'20px'}
                height={'25px'}
                color={isHover ? '#233C5A' : 'white'} />
            </button>
          </div>
        </aside>
      )}
      {!slideAbierta && (
        <aside
          className={`fixed top-0 left-0 h-screen w-[89px] bg-AzulSlide flex flex-col items-center justify-between p-5 animate-slideOut`}
          onMouseEnter={() => setSlideAbierta(true)}
        >
          <div>
            <span className="bg-RojoSlide h-[50px] w-[50px] rounded-[10px] flex items-center justify-center mb-[100px] shadow-3xl">
              <LogoCoop width={'20px'} height={'25px'} color={'white'} />
            </span>
            <div>
            {links.map(({ nombre, path, icon }) => (
                <Link key={path} to={path}>
                  <BotonSlidebar
                    Width={'60px'}
                    Icono={icon}
                    activo={location.pathname === path}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center h-[50px] gap-5 border-t pt-3 justify-between">
            <span >
              <IconUser width={'35px'} height={'35px'} color={'white'} />
            </span>
          </div>
        </aside>
      )}
    </>
  )
}

export default Slidebar;
