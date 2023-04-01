import Home from "../pages/Home";
import Upload from "../pages/Upload";
import HeaderOnly from '../components/Layout/HeaderOnly/index'
import Seafood from "../pages/Seafood";
import Cart from "../pages/Cart";
import SeafoodDetail from "../pages/SeafoodDetail";
import Payment from "../pages/Payment";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/upload", component: Upload , layout: HeaderOnly},
  {path: "/seafood/:id", component: Seafood},
  {path: "/cart", component: Cart, layout: HeaderOnly},
  {path: '/detail/:id', component: SeafoodDetail, layout:HeaderOnly},
  {path: '/payment', component: Payment, layout: HeaderOnly}
];

const privateRoutes = [

]

export {publicRoutes, privateRoutes}