import { useContext, useEffect, useState } from 'react'; // useEffect = siempre que se usen API y comunicarse con la misma

import Layout from '../../Components/Layout';
import Card from '../../Components/Card';

import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';
import { useParams } from 'react-router-dom';

function Home() {
  const context = useContext(ShoppingCartContext);
  const { category } = useParams();

  const [productFilterByCategory, setProductFilterByCategory] = useState(null);

  const filterByCategory = (products, category) => {
    if (category && products) {
      return products.filter(
        (product) => product.category.name.toLowerCase() === context.category
      );
    } else {
      return products;
    }
  };

  useEffect(() => {
    context.setCategory(category);
    setProductFilterByCategory(filterByCategory(context.items, category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, context]);

  const renderView = () => {
    if (productFilterByCategory && productFilterByCategory.length > 0) {
      if (context.searchByTitle?.length > 0) {
        if (context.filteredItems?.length > 0) {
          return context.filteredItems?.map((item) => (
            <Card key={item.id} data={item} />
          ));
        } else {
          return renderNoItemsFound();
        }
      } else {
        return productFilterByCategory?.map((item) => (
          <Card key={item.id} data={item} />
        ));
      }
    } else {
      // setIsInputFilterVisible(false);
      return renderNoItemsFound();
    }
  };

  const renderNoItemsFound = () => {
    // eslint-disable-next-line react/no-unescaped-entities
    return <div>We don't have anything :(</div>;
  };

  const renderInputFilter = () => {
    if (productFilterByCategory && productFilterByCategory.length > 0) {
      return (
        <input
          type='text'
          placeholder='Search a product...'
          className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
          onChange={(event) => context.setSearchByTitle(event.target.value)}
        />
      );
    }
  };

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Exclusive Products</h1>
      </div>
      {renderInputFilter()}
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
