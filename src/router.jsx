import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Tracking } from "./pages/Tracking";

export const router = createBrowserRouter([
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/homepage", 
        element: <Home />,
      },
      { path: "/shop", element: <Shop /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/tracking", element: <Tracking /> },
    ],
    
  },
]);