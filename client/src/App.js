import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth_Page/Registration";
import Login from "./pages/Auth_Page/LoginPage";
import Dashboard from "./pages/Auth_Page/user/Dashboard";
import PrivateRoute from "./components/layout/Routes/Private"
import ForgotPassword from "./pages/Auth_Page/ForgotPassword";
import AdminRoute from "./components/layout/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import ShowUsers from "./pages/Admin/ShowUsers";
import Orders from "./pages/Auth_Page/user/Orders";
import UserProfile from "./pages/Auth_Page/user/UserProfile";
import AllProducts from "./pages/Admin/AllProducts";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Searchpage from "./pages/Searchpage";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/Cart";
import AdminOrders from "./pages/Admin/AdminOrders";
import TryPage from "./pages/try";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<Searchpage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/dashboard" element={<PrivateRoute />}>        
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<UserProfile />} />
      </Route>
      <Route path="/dashboard" element = {<AdminRoute />}>
          <Route path="admin" element= {<AdminDashboard />} />
          <Route path="admin/create-category" element= {<CreateCategory />} />
          <Route path="admin/create-product" element= {<CreateProduct />} />
          <Route path="admin/users" element= {<ShowUsers/>} />
          <Route path="admin/products" element= {<AllProducts/>} />
          <Route path="admin/products/:slug" element= {<UpdateProduct/>} />
          <Route path="admin/orders" element= {<AdminOrders/>} />
      </Route>    
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Privacy />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/try" element={<TryPage />} />
    </Routes>
  );
}

export default App;
