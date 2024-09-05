
function InputEtiqueta({ etiqueta, type, placeholder, value, onChange }) {
  return(
    <div className="flex flex-col">
      <span className="font-bold">
        {etiqueta}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-[50px] rounded-[10px] border-Gris border px-[10px] w-[358px] min-w-[210px] focus:outline-gray-300"
      />
    </div>
  )
}

export default InputEtiqueta;