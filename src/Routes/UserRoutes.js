import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../User/Container/Home/Home";
import Shop from "../User/Container/Shop/Shop";
import Shop_Details from "../User/Container/Shop_Details/Shop_Details";
import Cart from "../User/Container/Cart/Cart";
import Checkout from "../User/Container/Checkout/Checkout";
import Testimonial from "../User/Container/Testimonial/Testimonial";
import Pages404 from "../User/Container/404Pages/Pages404";
import Contact from "../User/Container/Contact/Contact";
import Header from "../User/Component/Header/Header";
import Footer from "../User/Component/Footer/Footer";
import { ThemeContext } from "../context/ThemeContext";

function UserRoutes(props) {
  const themeContext = useContext(ThemeContext);
  console.log(themeContext);
  return (
    <div className={themeContext.theme}>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/shop/:id" element={<Shop_Details />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/testimonial" element={<Testimonial />} />
        <Route exact path="/pages404" element={<Pages404 />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default UserRoutes;
