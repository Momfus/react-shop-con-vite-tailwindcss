/* eslint-disable react/prop-types */
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const OrdersCard = ({ totalPrice, totalProducts }) => {
  return (
    <div className='flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80 mb-4'>
      <div className='flex justify-between w-full'>
        <p className='flex flex-col'>
          <span className='font-ligth'>27.10.2023</span>
          <span className='font-ligth'>{totalProducts} articles</span>
        </p>
        <p className='flex items-center gap-2'>
          <span className='font-medium text-2xl'>${totalPrice}</span>
          <ChevronRightIcon className='h-6 w-6 text-black cursor-pointer'></ChevronRightIcon>
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
