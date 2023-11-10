import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const Card = (data) => {
  const context = useContext(ShoppingCartContext); // leer el estado global del contexto

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
    context.closeCheckoutSideMenu();
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    productData.units = 1;
    context.setCount(++context.count);
    context.setCartProducts([...context.cartProducts, productData]);

    context.openCheckoutSideMenu();
    context.closeProductDetail();

    // console.log('CART: ', context.cartProducts);
  };

  const renderIcon = (id) => {
    // Se busca el producto si esta en el carrito, entonces se devuelve un ícono y funcion diferente a renderizar
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      return (
        <div className='absolute top-0 right-0 flex justify-center items-center bg_white w-6 h-6 rounded-full m-2 pb-1 font-bold'>
          <CheckCircleIcon className='h-6 w-6  text-black' />
        </div>
      );
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center  w-6 h-6 rounded-full m-2 pb-1 font-bold'
          onClick={(event) => addProductsToCart(event, data.data)}
        >
          <PlusCircleIcon className='h-6 w-6  text-white' />
        </div>
      );
    }
  };

  return (
    <div
      className='bg-white cursor-pointer w-56 h-60 rounded-lg'
      onClick={() => showProduct(data.data)}
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>
          {data.data.category.name}
        </span>
        <img
          className='w-full h-full object-cover rounded-lg'
          src={data.data.images[0]}
          alt={data.data.title}
        />
        {renderIcon(data.data.id)}
      </figure>

      <p className='flex justify-between items-center'>
        <span className='text-sm font-light'>{data.data.title}</span>
        <span className='text-lg font-medium'>${data.data.price}</span>
      </p>
    </div>
  );
};

export default Card;
