import { useContext } from 'react';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../../Components/OrderCard';

function MyOrder() {
  const context = useContext(ShoppingCartContext); // leer el estado global del contexto

  return (
    <Layout>
      MyOrder
      <div className='px-6 overflow-y-auto flex-col w-80'>
        {
          // Muestra el último elemento de la orden
          context.order?.slice(-1)[0].products.map((product) => (
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
