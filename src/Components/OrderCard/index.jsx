/* eslint-disable react/prop-types */
import { TrashIcon } from '@heroicons/react/24/solid';

const OrderCard = ({
  id,
  title,
  imageUrl,
  price,
  units,
  handleDelete,
  quantityChange,
}) => {
  // Para saber cuando poner el trash icon
  let rendexTrashIcon;
  if (handleDelete) {
    rendexTrashIcon = (
      <TrashIcon
        className='h-4 w-4  text-black cursor-pointer ml-4'
        onClick={() => {
          handleDelete(id);
        }}
      />
    );
  }

  // Para saber cuando renderizar el quantity y el cambiar la cantidad
  let rendexQuantityCheck;
  if (quantityChange) {
    rendexQuantityCheck = (
      <>
        <button
          onClick={() => {
            quantityChange(id, -1);
          }}
        >
          -
        </button>
        <p className='mx-1'>{units} </p>
        <button
          onClick={() => {
            quantityChange(id, 1);
          }}
        >
          +
        </button>
      </>
    );
  } else {
    rendexQuantityCheck = <p className='mx-1'>{units} </p>;
  }
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
        <div>
          <p className='text-lg font-medium gap-2'>${price}</p>
          <p className='text-sm font-light'>{title}</p>
        </div>
        {/* Se agrega según sea necesario (porque se usa en otras partes) */}
      </div>

      <div className='flex items-center'>
        <div className='flex justify-center w-6'>{rendexQuantityCheck}</div>

        {rendexTrashIcon}
      </div>
    </div>
  );
};

export default OrderCard;
