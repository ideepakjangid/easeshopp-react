import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductCartPage from "./pages/ProductCartPage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: ":category_slug?",
          element: <Home />,
        },
        {
          path: "product/:product_id",
          element: <ProductDetails />,
        },
        {
          path: "cart-details",
          element: <ProductCartPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
