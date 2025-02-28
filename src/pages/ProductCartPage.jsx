import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/MainContext";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { BsDash, BsPlus } from "react-icons/bs";

const ProductCartPage = () => {
  const { cart, setCart, total, setTotal } = useContext(Context);
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    setProducts(response.data.products);
  };
  useEffect(() => {
    fetchAllProducts();
  }, [cart]);

  return (
    <div className="container mx-auto md:mt-6 p-4 pt-0 md:pt-4">
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full bg-white shadow-lg rounded-lg border border-gray-200">
          <thead className="bg-blue-500 text-white text-sm uppercase sticky top-0">
            <tr>
              <th className="py-3 px-4 text-center">SR</th>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-center">Quantity</th>
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="flex justify-center items-center h-48 w-full">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div>Loading...</div>
                  </div>
                </td>
              </tr>
            ) : cart.length > 0 ? (
              cart.map((pid, index) => {
                const product = products.find((product) => product.id == pid);
                return (
                  <ProductCardRow
                    key={pid}
                    setCart={setCart}
                    cart={cart}
                    {...product}
                    index={index}
                    total={total}
                    setTotal={setTotal}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 text-center text-gray-500 text-lg font-semibold"
                >
                  No Products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden mt-6">
        {cart.length > 0 ? (
          cart.map((pid, index) => {
            const product = products.find((product) => product.id == pid);
            return (
              <MobileProductCard
                key={pid}
                {...product}
                index={index}
                total={total}
                setTotal={setTotal}
                cart={cart}
                setCart={setCart}
              />
            );
          })
        ) : (
          <tr>
            <td
              colSpan="5"
              className="py-4 text-center text-gray-500 text-lg font-semibold"
            >
              Cart is empty!
            </td>
          </tr>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-4">Total: ${total.toFixed()}</h1>
      </div>
    </div>
  );
};

export default ProductCartPage;

const ProductCardRow = ({
  thumbnail,
  title,
  id,
  price,
  index,
  setCart,
  cart,
  total,
  setTotal,
}) => {
  const [quantity, setQuantity] = useState(1);
  const updateQuantity = (val, price) => {
    if (quantity == 1 && val == -1) {
      return;
    }
    setQuantity(quantity + val);
    let final;
    if (val == 1) {
      final = total + price;
    } else {
      final = total - price;
    }
    setTotal(final);
    localStorage.setItem("total", JSON.stringify(final));
  };
  const removeProduct = (id, price, quantity) => {
    const updatedCart = cart.filter((productId) => productId !== id);
    setCart(updatedCart);
    let final = total - price * quantity;
    setTotal(final);
    localStorage.setItem("total", JSON.stringify(final));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <tr key={id} className="border-b hover:bg-gray-100 transition">
      <td className="py-4 px-4 text-center font-semibold">{index + 1}</td>
      <td className="py-4 px-4 flex items-center space-x-4">
        <img
          src={thumbnail}
          alt={thumbnail}
          className="w-12 h-12 object-cover rounded-md border"
        />
        <span className="text-gray-800 font-medium">{title}</span>
      </td>
      <td className="py-4 px-4 text-center">
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => updateQuantity(-1, price)}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            <BsDash size={16} />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => updateQuantity(1, price)}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            <BsPlus size={16} />
          </button>
        </div>
      </td>
      <td className="py-4 px-4 text-lg font-semibold text-center">
        ${(price * quantity).toFixed()}
      </td>
      <td className="py-4 px-4 text-center">
        <button
          onClick={() => removeProduct(id, price, quantity)}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
        >
          <AiOutlineDelete size={18} />
        </button>
      </td>
    </tr>
  );
};

const MobileProductCard = ({
  thumbnail,
  id,
  title,
  price,
  total,
  setTotal,
  cart,
  setCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const updateQuantity = (val, price) => {
    if (quantity == 1 && val == -1) {
      return;
    }
    setQuantity(quantity + val);
    let final;
    if (val == 1) {
      final = total + price;
    } else {
      final = total - price;
    }
    setTotal(final);
    localStorage.setItem("total", JSON.stringify(final));
  };
  const removeProduct = (id, price, quantity) => {
    const updatedCart = cart.filter((productId) => productId !== id);
    setCart(updatedCart);
    let final = total - price * quantity;
    setTotal(final);
    localStorage.setItem("total", JSON.stringify(final));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <div key={id} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={thumbnail}
          alt={title}
          className="w-16 h-16 object-cover rounded-md border"
        />
        <div>
          <p className="text-gray-800 font-medium">{title}</p>
          <p className="text-sm text-gray-600">
            Price: <strong>${(price * quantity).toFixed()}</strong>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateQuantity(-1, price)}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            <BsDash size={16} />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => updateQuantity(1, price)}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            <BsPlus size={16} />
          </button>
        </div>
        <button
          onClick={() => removeProduct(id, price, quantity)}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
        >
          <AiOutlineDelete size={18} />
        </button>
      </div>
    </div>
  );
};
