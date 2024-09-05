import { Children } from "react";

function NavBar({ children, activo }) {
  return (
    <nav className="flex h-[50px] w-full border-Gris border rounded-[10px] bg-white px-[50px]">
      <ul className="flex">
        {children}
      </ul>
    </nav>
  )
}

export default NavBar;