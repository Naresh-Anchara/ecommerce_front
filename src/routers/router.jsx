import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProducts/ManageProduct";
import UpdateProuct from "../pages/dashboard/admin/manageProducts/UpdateProuct";
import ManageUsers from "../pages/dashboard/admin/users/ManageUsers";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/",element:<Home/>},
        {path: "/categories/:categoryName",element:<CategoryPage/>},
        {path: "/search",element:<Search/>},
        {path: "/shop",element:<ShopPage/>},
        {path: "/shop/:id",element:<SingleProduct/>},
        {path: "/success",element:<PaymentSuccess/>},
        {path : "/orders/:orderId",element:<OrderDetails/>},
      ],
    },
    {
      path: "/login",
      element:<Login/>
    },
    {
      path: "/register",
      element:<Register/>
    },
    //dashboard routes starts here
    {
      path: "/dashboard",
      element:<PrivateRoute><DashboardLayout/></PrivateRoute>, //use a private routes here
      children : [
      //user route
       {path : '',element : <UserDMain/>},
       {path : 'orders',element : <UserOrders/>},
       {path : 'payments',element : <UserPayments/>},
       {path : 'profile',element : <UserProfile/>},
       {path : 'reviews',element : <UserReviews/>},



       //admin routes (only accessable for admin)
       {
        path : 'admin',
        element : <PrivateRoute role="admin"><AdminDMain/></PrivateRoute>
      },
       {
        path : 'add-product',
        element : <PrivateRoute role="admin"><AddProduct/></PrivateRoute>
      },
       {
        path : 'manage-products',
        element : <PrivateRoute role="admin"><ManageProduct/></PrivateRoute>
      },
       {
        path : 'update-product/:id',
        element : <PrivateRoute role="admin"><UpdateProuct/></PrivateRoute>
      },
       {
        path : 'users',
        element : <PrivateRoute role="admin"><ManageUsers/></PrivateRoute>
      },
       {
        path : 'manage-orders',
        element : <PrivateRoute role="admin"><ManageOrders/></PrivateRoute>
      },
      ]
    } 
    
  ] ,
  {
    basename: "/ecommerce_front", // 👈 REQUIRED for GitHub Pages
  }

);
  export default router;