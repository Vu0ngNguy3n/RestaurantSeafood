import Home from "../pages/Home";
import Upload from "../pages/Upload";
import HeaderOnly from '../components/Layout/HeaderOnly/index'
import Seafood from "../pages/Seafood";
import Cart from "../pages/Cart";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/upload", component: Upload , layout: HeaderOnly},
  {path: "/seafood/:id", component: Seafood},
  {path: "/cart", component: Cart, layout: HeaderOnly}
];

const privateRoutes = [

]

export {publicRoutes, privateRoutes}