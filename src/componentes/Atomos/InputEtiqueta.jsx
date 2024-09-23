import { useEffect } from 'react';
import { useState } from 'react';

function InputEtiqueta({ etiqueta, type, placeholder, value, onChange, width, requerido, forceValidate, textoBoton, onClick, colorBoton, onKeyDown, onKeyDownBoton, boton }) {
  const [error, setError] = useState('');
  const [boton, setBoton] = useState(false);

  const handleBlur = () => {
    if (requerido && !value) {
      setError('Este campo es obligatorio');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    if (forceValidate) {
      handleBlur();
    }
  }, [forceValidate]);

  return (
    <>
      <div className="flex flex-col">
        <span className="font-bold">{etiqueta}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onWheel={(e) => e.target.blur()}
          onKeyDown={onKeyDown}
          className={`h-[45px] rounded-[10px] border px-[10px] focus:outline-gray-300 ${error ? 'border-red-500' : 'border-Gris'}`}
          style={{ width: width, borderRadius: boton ? '10px 10px 0 0' : '10px' }}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
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
      <button 
        onClick={onClick}
        onKeyDown={onKeyDownBoton}
        className={`rounded-[10px] px-[20px] py-[10px] text-white font-bold shadow-3xl`}
        style={{ backgroundColor: colorBoton, display: boton ? 'block' : 'none', borderRadius: '0 0 10px 10px' }}
      >
      {textoBoton}
      </button>
    </>
  );
}


export default InputEtiqueta;