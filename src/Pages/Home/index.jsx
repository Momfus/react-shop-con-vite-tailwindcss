import { useContext, useEffect, useState } from 'react'; // useEffect = siempre que se usen API y comunicarse con la misma

import Layout from '../../Components/Layout';
import Card from '../../Components/Card';

import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';
import { useParams } from 'react-router-dom';

function Home() {
  const context = useContext(ShoppingCartContext);
  const { category } = useParams();

  let productFilterByCategory = null;

  const filterByCategory = (products, category) => {
    if (category && products) {
      const productsFiltered = products.filter(
        (product) => product.category.name.toLowerCase() === context.category
      );

      return productsFiltered;
    } else {
      return products;
    }
  };

  // No es necesario un estado ni effect para esto, una vez que se hace un cambio de set con alguno, se vuelve a renderizar este componente
  {
    context.setCategory(category);
    productFilterByCategory = filterByCategory(context.items, category);
  }

  const renderView = () => {
    if (productFilterByCategory)
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

  const renderHomeByLoadingApi = () => {
    if (context.loadingApi || productFilterByCategory === null) {
      return <h1 className='m-4 font-bold text-xl'>Loading...</h1>;
    } else {
      return (
        <>
          <div className='flex items-center justify-center relative w-80 mb-4'>
            <h1 className='font-medium text-xl'>
              {category
                ? `Products: ${
                    category.charAt(0).toUpperCase() + category.slice(1)
                  }`
                : 'All Products'}
            </h1>
          </div>
          {renderInputFilter()}
          <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
            {renderView()}
          </div>
          <ProductDetail />
        </>
      );
    }
  };

  return <Layout>{renderHomeByLoadingApi()}</Layout>;
}

export default Home;
