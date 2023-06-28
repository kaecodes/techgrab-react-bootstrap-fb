import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayOut from "./layouts/RootLayOut";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Home,
  Login,
  Register,
  Reset,
  About,
  Contact,
  Shop,
  Admin,
  ProductDetails,
} from "./pages/index";
import AdminOnlyRoute from "./components/AdminOnlyRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayOut />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route
        path="/admin/*"
        element={
          <AdminOnlyRoute>
            <Admin />
          </AdminOnlyRoute>
        }
      />
      <Route path="/product-details/:id" element={<ProductDetails />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
