import { useEffect } from 'react';
import { useState } from 'react';

function InputEtiqueta({
  etiqueta,
  type,
  placeholder,
  value,
  onChange,
  width,
  requerido,
  forceValidate,
  textoBoton,
  onClickBoton,
  colorBoton,
  onKeyDown,
  onKeyDownBoton,
  botonVisible
}) {
  const [error, setError] = useState('');

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
    <div className='flex items-center'> {/* Cambié items-end por items-center para centrar el contenido */}
      <div className="flex flex-col">
        <span className="font-bold">{etiqueta}</span>
        <div className="flex">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            onWheel={(e) => e.target.blur()}
            onKeyDown={onKeyDown}
            className={`h-[45px] rounded-l-[10px] border px-[10px] focus:outline-Gris ${error ? 'border-red-500' : 'border-Gris'}`}
            style={{ width: width }}
          />
          {botonVisible && (
            <button
              onClick={onClickBoton}
              onKeyDown={onKeyDownBoton}
              className={`h-[45px] rounded-r-[10px] px-[20px] py-[10px] text-white font-bold shadow-3xl`}
              style={{ backgroundColor: colorBoton }}
            >
              {textoBoton}
            </button>
          )}
        </div>
        <span className="text-xs text-red-500" style={{ minHeight: '20px' }}>
          {error && error}
        </span>

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
    </div>
  );
}

export default InputEtiqueta;
