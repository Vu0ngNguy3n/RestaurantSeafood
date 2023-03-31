import { BrowserRouter, Routes, Route } from "react-router-dom";
import {publicRoutes} from './routes/index'
import DefaultLayout from './components/Layout/DefaultLayout/index'
import { createContext, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const CartContext = createContext()

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
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
