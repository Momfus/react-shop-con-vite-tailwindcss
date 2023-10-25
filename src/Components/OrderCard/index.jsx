import { XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

const OrderCard = ({ title, imageUrl, price }) => {
  // Esto es para que no moleste el error de propTypes
  OrderCard.propTypes = {
    title: PropTypes.node.isRequired,
    imageUrl: PropTypes.node.isRequired,
    price: PropTypes.node.isRequired,
  };

  return (
    <div className='flex justify-between items-center mb-2'>
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20'>
          <img
            className='w-full h-full rounded-lg object-cover'
            src={imageUrl}
            alt={title}
          />
        </figure>
        <p className='text-sm font-light'>{title}</p>
      </div>
      <div>
        <p className='text-lg font-medium gap-2'>${price}</p>
        <XMarkIcon className='h-6 w-6  text-black cursor-pointer' />
      </div>
    </div>
  );
};

export default OrderCard;
