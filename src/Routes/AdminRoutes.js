import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Admin/Component/Layout/Layout";
import Category from "../Admin/Container/Category/Category";
import Facilities from "../Admin/Container/Facilities/Facilities";
import Product from "../Admin/Container/Product/Product";
import Counter from "../Admin/Container/Counter/Counter";
import Coupon from "../Admin/Container/Coupon/Coupon";

function AdminRoutes(props) {
  return (
    <Layout>
      <Routes>
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/facilities" element={<Facilities />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/counter" element={<Counter />} />
        <Route exact path="/coupon" element={<Coupon />} />
      </Routes>
    </Layout>
  );
}

export default AdminRoutes;
