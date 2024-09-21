import { Skeleton } from "antd";

function FilaCliente({ nombre, cedula, onClick, seleccionado }) {
  return (
    <div
      className={`flex items-center justify-around h-[50px] px-[20px] border-y border-y-Gris w-full cursor-pointer ${seleccionado ? 'bg-Gris rounded-[10px]' : 'hover:bg-Gris hover:rounded-[10px]'}`}
      onClick={onClick}
    >
      <span className="font-bold w-2/3 truncate">{nombre}</span>
      <span>C.I {cedula}</span>
    </div>
  )
}

function FilaClienteSkeleton() {
  return (
    <div className="flex items-center justify-around h-[50px] px-[20px] border-y border-y-Gris w-full cursor-pointer hover:bg-Gris hover:rounded-[10px]">
      <Skeleton.Input active size="small" style={{ width: '60%' }} />

      <Skeleton.Input active size="small" style={{ width: '30%' }} />
    </div>
  )
}

export default FilaCliente;
export { FilaClienteSkeleton };