import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext();

// Se crea un contexto dentro del componente "hijo" recibido para compartir la data de los props
export const ShoppingCartProvider = ({ children }) => {
  ShoppingCartProvider.propTypes = {
    // Esto es para que no moleste el error de propTypes
    children: PropTypes.node.isRequired,
  };

  const [count, setCount] = useState(0);

  return (
    <ShoppingCartContext.Provider value={{ count, setCount }}>
      {children};
    </ShoppingCartContext.Provider>
  );
};
