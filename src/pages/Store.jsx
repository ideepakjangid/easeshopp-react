import { useState } from "react";
import { FiShoppingCart, FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const categories = [
  "Beauty",
  "Fragrances",
  "Furniture",
  "Groceries",
  "Home Decoration",
  "Kitchen Accessories",
  "Laptops",
  "Mens Shirts",
  "Mens Shoes",
  "Mens Watches",
  "Mobile Accessories",
  "Motorcycle",
  "Skin Care",
  "Smartphones",
  "Sports Accessories",
  "Sunglasses",
  "Tablets",
  "Tops",
  "Vehicle",
  "Womens Bags",
  "Womens Dresses",
  "Womens Jewellery",
  "Womens Shoes",
  "Womens Watches",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold">EaseShopp</h1>
        <div className="flex items-center gap-4">
          <button className="relative text-xl">
            <FiShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <AiOutlineClose /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Sidebar & Categories */}
      <div className="flex">
        <aside
          className={`bg-gray-100 w-64 p-4 md:block ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="cursor-pointer hover:text-blue-500">
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                <h3 className="font-semibold">Product {index + 1}</h3>
                <p className="text-gray-600">$19.99</p>
                <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}
