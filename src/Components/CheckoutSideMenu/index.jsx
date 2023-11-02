import './styles.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import { XCircleIcon } from '@heroicons/react/24/solid';
import OrderCard from '../OrderCard';
import { totalPrice } from '../../utils';

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext); // leer el estado global del contexto

  // Borrar elemento de la orden
  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts)
    context.setCount(--context.count)
  };

  // Manejhar los cambios en cantidad de la orden
  const quantityChange = (id, type) => {
    const auxProducts = [...context.cartProducts]

    const itemIndex = auxProducts.findIndex((product) => product.id == id);

    if (type > 0) {
      auxProducts[itemIndex].units++;
      context.setCartProducts(auxProducts);
    } else {
      auxProducts[itemIndex].units--;
      context.setCartProducts(auxProducts);
    }

    if (auxProducts[itemIndex].units === 0) {
      handleDelete(id);
    }
  };

  // Confirmar la orden
  const handleCheckout = () => {
    const orderToAdd = {
      date: '27.10.2023',
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([]) // Limpiar la lista de mla orden
    context.setCount(0)
    context.closeCheckoutSideMenu()
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

      <div className='px-6 overflow-y-auto flex-1'>
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
      <div className='px-6'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total</span>
          <span className='font-medium text-2xl'>
            ${totalPrice(context.cartProducts)}
          </span>
        </p>

        {/* Link es un componente de react-dom que permite hacer redirección */}
        <Link to='/my-orders/last'>
          <button
            className='bg-black w-full py-3 mb-6 text-white rounded-lg'
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu;
