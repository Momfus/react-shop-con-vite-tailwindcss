import { useContext, useEffect, useState } from 'react'; // useEffect = siempre que se usen API y comunicarse con la misma

import Layout from '../../Components/Layout';
import Card from '../../Components/Card';

import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';
import { useParams } from 'react-router-dom';

function Home() {
  const context = useContext(ShoppingCartContext);
  const { category } = useParams();

  // const [isInputFilterVisible, setIsInputFilterVisible] = useState(false);

  useEffect(() => {
    context.setCategory(category);
  }, [category, context]);

  const filterByCategory = (products, category) => {
    console.log(category);
    if (category && products) {
      return products.filter(
        (product) => product.category.name.toLowerCase() === context.category
      );
    } else {
      return products;
    }
  };

  const renderView = () => {
    const productFilterByCategory = filterByCategory(context.items, category);
    if (productFilterByCategory && productFilterByCategory.length > 0) {
      // setIsInputFilterVisible(true);
      if (context.searchByTitle?.length > 0) {
        if (context.filteredItems?.length > 0) {
          return context.filteredItems?.map((item) => (
            <Card key={item.id} data={item} />
          ));
        } else {
          return renderNoItemsFounded();
        }
      } else {
        return productFilterByCategory?.map((item) => (
          <Card key={item.id} data={item} />
        ));
      }
    } else {
      // setIsInputFilterVisible(false);
      return renderNoItemsFounded();
    }
  };

  const renderNoItemsFounded = () => {
    // eslint-disable-next-line react/no-unescaped-entities
    return <div>We don't have anything :(</div>;
  };

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Exclusive Products</h1>
      </div>
      <input
        type='text'
        placeholder='Search a product...'
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
