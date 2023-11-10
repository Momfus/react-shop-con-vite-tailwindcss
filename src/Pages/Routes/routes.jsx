import { Navigate, useRoutes } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import { useContext } from 'react';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import SignIn from '../SignIn';
import NotFound from '../NotFound';

export const AppRoutes = () => {
  // Esto es para evitar que alguien que no este logueado vea otras rutas
  const context = useContext(ShoppingCartContext);

  // Acount
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  // Sign Out
  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOut);

  // Has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = Object.keys(context.account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = context.signOut || parsedSignOut;

  // Se encapsula en una función para definir las rutas usando el hook useRoutes
  return useRoutes([
    {
      path: '/',
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={'/sign-in'} />
        ),
    },
    {
      path: '/category/:category',
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={'/sign-in'} />
        ),
    },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ]);
};
