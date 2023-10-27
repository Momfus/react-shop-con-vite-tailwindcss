import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext();

// Se crea un contexto dentro del componente "hijo" recibido para compartir la data de los props
export const ShoppingCartProvider = ({ children }) => {
  ShoppingCartProvider.propTypes = {
    // Esto es para que no moleste el error de propTypes
    children: PropTypes.node.isRequired,
  };

  // Shopping Cart - Incremente quantity
  const [count, setCount] = useState(0);

  // Product detail - open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  // Funciones para abrir y cerrar el detalle del producto que se comparte entre varios componentes en el context
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout side menu - open/close
  const [isCheckoutSideMenuOpen, setCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setCheckoutSideMenuOpen(false);
  // Product detail - Show product
  const [productToShow, setProductToShow] = useState({
    title: '',
    price: '',
    description: '',
    images: [],
    units: 0,
  });

  // Shopping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart - Order
  const [order, setOrder] = useState([]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
      }}
    >
      {children};
    </ShoppingCartContext.Provider>
  );
};
