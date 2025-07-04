import { createBrowserRouter } from "react-router-dom";
// ...import your components

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/categories/:categoryName", element: <CategoryPage /> },
        { path: "/search", element: <Search /> },
        { path: "/shop", element: <ShopPage /> },
        { path: "/shop/:id", element: <SingleProduct /> },
        { path: "/success", element: <PaymentSuccess /> },
        { path: "/orders/:orderId", element: <OrderDetails /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
      children: [
        { path: "", element: <UserDMain /> },
        { path: "orders", element: <UserOrders /> },
        { path: "payments", element: <UserPayments /> },
        { path: "profile", element: <UserProfile /> },
        { path: "reviews", element: <UserReviews /> },

        // admin routes
        { path: "admin", element: <PrivateRoute role="admin"><AdminDMain /></PrivateRoute> },
        { path: "add-product", element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute> },
        { path: "manage-products", element: <PrivateRoute role="admin"><ManageProduct /></PrivateRoute> },
        { path: "update-product/:id", element: <PrivateRoute role="admin"><UpdateProuct /></PrivateRoute> },
        { path: "users", element: <PrivateRoute role="admin"><ManageUsers /></PrivateRoute> },
        { path: "manage-orders", element: <PrivateRoute role="admin"><ManageOrders /></PrivateRoute> },
      ],
    },
  ],
  {
    basename: "/ecommerce_front", // 👈 REQUIRED for GitHub Pages
  }
);

export default router;
