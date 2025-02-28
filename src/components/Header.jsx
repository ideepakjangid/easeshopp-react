import React, { useContext } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";

const Header = () => {
  const {cart}=useContext(Context)
  return (
    <>
      <div className="shadow-lg sticky top-0 bg-white z-10">
        <Container className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-3xl font-bold">EaseShopp</h1>
          </div>
          <ul className="flex gap-4">
            <li>
                <Link className="font-bold hover:text-slate-800" to={"/"}>Store</Link>
            </li>
            <li>
                <Link className="font-bold hover:text-slate-800" to={"/cart-details"}>Cart ({cart.length == 0 ? "0" : cart.length })</Link>
            </li>
          </ul>
        </Container>
      </div>
    </>
  );
};

export default Header;
