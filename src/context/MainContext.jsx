
import React, { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const Context = createContext();

const MainContext = (props) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0)
  const addToCart = (product_Id,product_price) => {
    if (cart.includes(product_Id)) {
      toast.warn("Item Already in Cart!!");
      return;
    }
    setCart([...cart, product_Id]);
    let final = total + product_price
    setTotal(final)
    localStorage.setItem("total",final)
    toast.success("Item Added!!");
  };


  useEffect(() => {
    if (cart.length == 0) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    const lsCart = localStorage.getItem("cart");
    const total = localStorage.getItem("total")
    if (lsCart) {
      setCart(JSON.parse(lsCart));
    }
    if(total){
      setTotal(JSON.parse(total))
    }
  },[]);



  return (
    <Context.Provider value={{ cart, setCart, addToCart,total , setTotal}}>
      <ToastContainer />
      {props.children}
    </Context.Provider>
  );
};
export { Context };

export default MainContext;
