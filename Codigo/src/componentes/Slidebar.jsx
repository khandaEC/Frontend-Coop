import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
import { useAuth0 } from "@auth0/auth0-react"; 

function Slidebar({ sidebarOpen, handleMouseEnter, handleMouseLeave }) {
  const location = useLocation();
  const { logout, user } = useAuth0();
  
  const links = [
    { nombre: 'Inicio', path: PATH_DASHBOARD, icon: <IconHome width={'25px'} height={'25px'} color={'white'} /> },
    { nombre: 'Ahorros', path: PATH_AHORROS, icon: <IconAhorros width={'25px'} height={'25px'} color={'white'} /> },
    { nombre: 'Créditos', path: PATH_CREDITOS, icon: <IconCreditos width={'25px'} height={'25px'} color={'white'} /> },
    { nombre: 'Interés de Socios', path: PATH_INTERES_SOCIOS, icon: <IconInteres width={'25px'} height={'25px'} color={'white'} /> },
    { nombre: 'Aporte de Socios', path: PATH_APORTE_SOCIOS, icon: <IconAporte width={'25px'} height={'25px'} color={'white'} /> },
  ];

  return (
    <motion.aside
      className="fixed top-0 left-0 h-screen bg-AzulSlide flex flex-col items-center justify-between p-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ width: sidebarOpen ? '295px' : '100px' }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden' }}
    >
      <div className="flex flex-col w-full justify-center">
        <div className="flex items-center justify-center w-full h-[50px] gap-5 mb-[100px]">
          <span className="bg-RojoSlide rounded-[10px] shadow-3xl flex items-center justify-center h-[50px] w-[50px]">
            <LogoCoop width={'20px'} height={'25px'} color={'white'} />
          </span>
          {sidebarOpen && (
            <motion.span
              className="text-white font-bold"
              animate={{ opacity: sidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Coop. Ahorro y Crédito César Vásquez.
            </motion.span>
          )}
        </div>

        <div className="w-full">
          {links.map(({ nombre, path, icon }) => (
            <Link key={path} to={path}>
              <BotonSlidebar
                Texto={nombre}
                Icono={icon}
                activo={location.pathname === path}
                showText={sidebarOpen}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center w-full h-[50px] gap-2 border-t pt-3">
        <span>
          <IconUser width={'35px'} height={'35px'} color={'white'} />
        </span>
        {sidebarOpen && (
          <motion.span className="text-white font-bold" animate={{ opacity: sidebarOpen ? 1 : 0 }} transition={{ duration: 0.3 }}>
            {user.name}
          </motion.span>
        )}
        {sidebarOpen && (
          <motion.button
            className="hover:bg-white px-[14px] py-[11px] rounded-[10px] flex items-center justify-center"
            onClick={() => logout()}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconLogout width={'20px'} height={'25px'} color={'white'} />
          </motion.button>
        )}
      </div>
    </motion.aside>
  );
}

export default Slidebar;
