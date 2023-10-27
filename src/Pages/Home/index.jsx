import { useState, useEffect } from 'react'; // useEffect = siempre que se usen API y comunicarse con la misma

import Layout from '../../Components/Layout';
import Card from '../../Components/Card';

import apiUrl from '../../api';
import ProductDetail from '../../Components/ProductDetail';

function Home() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    // Método temporal para usar async
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

  return (
    <Layout>
      Home
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {items?.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
