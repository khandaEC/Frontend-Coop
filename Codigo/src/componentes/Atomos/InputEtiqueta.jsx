
function InputEtiqueta({ etiqueta, type, placeholder, value, onChange, width }) {
  return (
    <div className="flex flex-col">
      <span className="font-bold">
        {etiqueta}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onWheel={(e) => e.target.blur()}
        className="h-[45px] rounded-[10px] border-Gris border px-[10px] focus:outline-gray-300"
        style={{ width: width }}
      />
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        } 
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}

export default InputEtiqueta;