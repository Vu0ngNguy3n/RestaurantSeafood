import Home from "../pages/Home";
import Upload from "../pages/Upload";
import HeaderOnly from "../components/Layout/HeaderOnly/index";
import Seafood from "../pages/Seafood";
import Cart from "../pages/Cart";
import SeafoodDetail from "../pages/SeafoodDetail";
import Payment from "../pages/Payment";
import HomeDashboard from "../pages/HomeDashboard";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  { path: "/seafood/:slug", component: Seafood },
  { path: "/cart", component: Cart, layout: HeaderOnly },
  { path: "/detail/:slug", component: SeafoodDetail, layout: HeaderOnly },
  { path: "/payment", component: Payment, layout: HeaderOnly },
  {path: "/admin/home", component: HomeDashboard, }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
