import { useEffect } from 'react';

const handleScroll = (event) => {
  // Verifica la dirección del desplazamiento de la rueda del ratón
  const delta = Math.sign(event.deltaY);
  
  // Si el usuario está desplazando hacia abajo
  if (delta === 1) {
    // Desplaza suavemente hacia la siguiente sección
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth'
    });
  }
  // Si el usuario está desplazando hacia arriba
  else if (delta === -1) {
    // Desplaza suavemente hacia la sección anterior
    window.scrollTo({
      top: window.scrollY - window.innerHeight,
      behavior: 'smooth'
    });
  }
};

const ScrollHandler = () => {
  useEffect(() => {
    // Agrega el controlador de eventos al componente
    window.addEventListener('wheel', handleScroll);
    
    // Remueve el controlador de eventos cuando el componente se desmonta
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollHandler;
