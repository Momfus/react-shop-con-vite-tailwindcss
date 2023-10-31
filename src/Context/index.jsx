import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiUrl from '../api';

export const ShoppingCartContext = createContext();

// Se crea un contexto dentro del componente "hijo" recibido para compartir la data de los props
export const ShoppingCartProvider = ({ children }) => {
  ShoppingCartProvider.propTypes = {
    // Esto es para que no moleste el error de propTypes
    children: PropTypes.node.isRequired,
  };

  const [category, setCategory] = useState(undefined);

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

  // Get Products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  // Get Products by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  useEffect(() => {
    // Método local para usar async
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        let data = await response.json();
        data = data.map((item) => ({
          ...item,
          units: 0, // añadido para el conteo en el carrito
        }));
        setItems(data);
      } catch (error) {
        console.error(`Ocurrio un error: ${error}`);
      }
    };

    // Usar la función para obtener los datos
    fetchData();
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    let filerItems = category
      ? items?.filter(
          (product) => product.category.name.toLowerCase() === category
        )
      : items;
    return filerItems.sfilter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchByTitle) {
      setFilteredItems(filteredItemsByTitle(items, searchByTitle));
    }
  }, [items, searchByTitle]);
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
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        category,
        setCategory,
      }}
    >
      {children};
    </ShoppingCartContext.Provider>
  );
};
