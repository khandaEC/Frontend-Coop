import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function BotonSlidebar({ Texto, Icono, activo, showText }) {
  const [isVisible, setIsVisible] = useState(true);
  const textVariants = {
    visible: {
      opacity: 1,
      width: 'auto',
      marginLeft: '0.5rem',
      transition: { duration: 0.3 },
    },
    hidden: {
      opacity: 0,
      width: 0,
      marginLeft: 0,
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    if (showText) {
      setIsVisible(true);
    }
  }, [showText]);

  return (
    <button className={`flex items-center px-[15px] w-full h-[50px] gap-2 rounded-[10px] text-white my-2 ${activo ? 'bg-RojoSlide shadow-2xl font-bold' : 'bg-transparent hover:bg-RojoSlide hover:font-bold hover:shadow-2xl'}`}>
      {Icono}
      {isVisible && (
        <motion.span
          className="whitespace-nowrap overflow-hidden"
          variants={textVariants}
          animate={showText ? 'visible' : 'hidden'}
          onAnimationComplete={() => {
            if (!showText) {
              setIsVisible(false);
            }
          }}
        >
          {Texto}
        </motion.span>
      )}

    </button>
  )
}

export default BotonSlidebar;
