import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { XCircleIcon } from '@heroicons/react/24/solid';
import OrderCard from '../OrderCard';

import './styles.css';

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext); // leer el estado global del contexto

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
    context.setCount(--context.count);
  };

  const quantityChange = (id, type) => {
    const auxProducts = [...context.cartProducts];

    const itemIndex = auxProducts.findIndex((product) => product.id == id);
    console.log(`antes: ${auxProducts[itemIndex].units} `);
    if (type > 0) {
      auxProducts[itemIndex].units++;
      context.setCartProducts(auxProducts);
    } else {
      auxProducts[itemIndex].units--;
      context.setCartProducts(auxProducts);
    }
    console.log(`despues: ${auxProducts[itemIndex].units} `);
    if (auxProducts[itemIndex].units === 0) {
      handleDelete(id);
    }
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'
      } checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div
          className=' cursor-pointer '
          onClick={() => context.closeCheckoutSideMenu()}
        >
          <XCircleIcon className='h-6 w-6  text-gray-300' />
        </div>
      </div>

      <div className='px-6 overflow-y-auto'>
        {context.cartProducts.map((product) => (
          <OrderCard
            id={product.id}
            key={product.id}
            title={product.title}
            imageUrl={product.images}
            price={product.price}
            units={product.units}
            handleDelete={handleDelete}
            quantityChange={quantityChange}
          />
        ))}
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
