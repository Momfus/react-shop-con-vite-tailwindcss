import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../../Components/OrderCard';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
function MyOrder() {
  const context = useContext(ShoppingCartContext); // leer el estado global del contexto
  const currentPath = window.location.pathname;

  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  if (index === 'last') {
    index = context.order?.length - 1; // Se toma el último elemento (de la orden creada si es 'last')
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-5'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
        <h1>MyOrder</h1>
      </div>
      <div className='px-6 overflow-y-auto flex-col w-80'>
        {
          // Muestra el último elemento de la orden
          context.order?.[index]?.products.map((product) => (
            <OrderCard
              id={product.id}
              key={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              units={product.units}
            />
          ))
        }
      </div>
    </Layout>
  );
}

export default MyOrder;
