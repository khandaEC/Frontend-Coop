import { useState } from "react";
import BotonSlidebar from "./Atomos/BotonSlideBar";
import LogoCoop from "../assets/LogoCoop";
import IconHome from "../assets/IconHome";
import IconCreditos from "../assets/IconCreditos";
import IconAhorros from "../assets/IconAhorros";
import IconInteres from "../assets/IconInteres";
import IconAporte from "../assets/IconAporte";
import IconUser from "../assets/IconUser";
import IconLogout from "../assets/IconLogout";

function Slidebar() {

  const [isHover, setIsHover] = useState(false);

  return (
    <aside className="h-screen w-[325px] bg-AzulSlide flex flex-col items-center justify-between p-5">
      <div className="flex items-center w-[285px] h-[50px] gap-5">
        <span className="bg-RojoSlide px-[14px] py-[11px] rounded-[10px]">
          <LogoCoop width={'20px'} height={'25px'} color={'white'}/>
        </span>
        <span className="text-white font-bold">
          Coop. Ahorro y Crédito César Vásquez.
        </span>
      </div>
      <div>
        <BotonSlidebar Texto="Inicio" Icono={<IconHome width={'25px'} height={'25px'} color={'white'} />} />
        <BotonSlidebar Texto="Ahorros" Icono={<IconAhorros width={'25px'} height={'25px'} color={'white'} />} />
        <BotonSlidebar Texto="Créditos" Icono={<IconCreditos width={'25px'} height={'25px'} color={'white'} />} />
        <BotonSlidebar Texto="Interés de Socios" Icono={<IconInteres width={'25px'} height={'25px'} color={'white'} />} />
        <BotonSlidebar Texto="Aporte de Socios" Icono={<IconAporte width={'25px'} height={'25px'} color={'white'} />} />
      </div>
      <div className="flex items-center w-[285px] h-[50px] gap-5 border-t pt-3 justify-between">
        <span >
          <IconUser width={'35px'} height={'35px'} color={'white'}/>
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
            color={isHover ? '#233C5A' : 'white'}/>
        </button>
      </div>
    </aside>
  )
}

export default Slidebar;