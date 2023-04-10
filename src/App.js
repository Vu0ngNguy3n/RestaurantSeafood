import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/index";
import DefaultLayout from "./components/Layout/DefaultLayout/index";
import { createContext, Fragment } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page404 from "./pages/404Page";
export const CartContext = createContext();

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                key={index}
              />
            );
          })}
          <Route path="*" element={<Page404/>} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
