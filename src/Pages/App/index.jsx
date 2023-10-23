import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../Context";

import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../SignIn";

import Navbar from "../../Components/Navbar";

import "./App.css";

// Se encapsula en una función para definir las rutas usando el hook useRoutes
const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

function App() {
  return (
    <ShoppingCartProvider>
      {/* Así se enlazan las rutas y se puede redirigir usando el AppRoute */}
      <BrowserRouter>
        <AppRoutes></AppRoutes>
        <Navbar />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
