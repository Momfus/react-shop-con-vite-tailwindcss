import { BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider, initializeLocalStorage } from '../../Context';

import Navbar from '../../Components/Navbar';
import CheckoutSideMenu from '../../Components/CheckoutSideMenu';

import './App.css';
import { AppRoutes } from '../Routes/routes';

function App() {
  initializeLocalStorage();

  return (
    <ShoppingCartProvider>
      {/* Así se enlazan las rutas y se puede redirigir usando el AppRoute */}
      <BrowserRouter>
        <AppRoutes></AppRoutes>
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
