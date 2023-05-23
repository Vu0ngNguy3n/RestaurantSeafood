import Home from "../pages/Home";
import Upload from "../pages/Upload";
import HeaderOnly from "../components/Layout/HeaderOnly/index";
import Seafood from "../pages/Seafood";
import Cart from "../pages/Cart";
import SeafoodDetail from "../pages/SeafoodDetail";
import Payment from "../pages/Payment";
import HomeDashboard from "../pages/HomeDashboard";
import AddSeafood from "../pages/Admin/AddSeafood";
import EditSeafood from "../pages/Admin/EditSeafood";
import Login from "../pages/Login/Login";
import OrderList from "../pages/Admin/OrderList/OrderList";
import OrderInformation from "../pages/Admin/OrderInformation/OrderInformation";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  { path: "/seafood/:slug", component: Seafood },
  { path: "/cart", component: Cart, layout: HeaderOnly },
  { path: "/detail/:slug", component: SeafoodDetail, layout: HeaderOnly },
  { path: "/payment", component: Payment, layout: HeaderOnly },
  { path: "/admin/home", component: HomeDashboard, layout: HeaderOnly },
  { path: "/admin/addSeafood", component: AddSeafood, layout: HeaderOnly },
  {
    path: "/admin/editSeafood/:slug",
    component: EditSeafood,
    layout: HeaderOnly,
  },
  { path: "/admin/orderList", component: OrderList, layout: HeaderOnly },
  { path: "/admin/orderInfo/:slug", component: OrderInformation, layout: HeaderOnly },
  { path: "login", component: Login, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
