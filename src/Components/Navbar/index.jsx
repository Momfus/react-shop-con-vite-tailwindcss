import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';

import { ShoppingCartIcon } from '@heroicons/react/24/solid';

// Navbar usar react-router-dom para redirigir con distintas opciones
const Navbar = () => {
  const context = useContext(ShoppingCartContext); // leer el estado global del contexto
  const activeStyle = 'underline'; // Manejo de clasees de la ruta activa

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-gray-50'>
      {/* Izquierdo */}
      <ul className='flex items-center gap-3'>
        <li className='font-semibold text-lg'>
          <NavLink to='/'>Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/category/clothes'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/category/electronics'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/category/furnitures'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/category/toys'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/category/others'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Others
          </NavLink>
        </li>
      </ul>

      {/* Derecha */}
      <ul className='flex items-center gap-3'>
        <li className='text-black/60'>momfus@outlook.com</li>
        <li>
          <NavLink
            to='/my-orders'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my-account'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my-order'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Order
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Sign In
          </NavLink>
        </li>
        <li className='flex justify-center items-center'>
          <ShoppingCartIcon className='h-6 w-6' /> {context.count}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
