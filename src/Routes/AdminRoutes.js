import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Admin/Component/Layout/Layout";
import Category from "../Admin/Container/Category/Category";
import Facilities from "../Admin/Container/Facilities/Facilities";
import Product from "../Admin/Container/Product/Product";
import Counter from "../Admin/Container/Counter/Counter";
import Coupon from "../Admin/Container/Coupon/Coupon";
import Crud from "../Admin/Container/Crud/Crud";
import { CrudContext } from "../context/ContextCrud";
import Contact from "../Admin/Container/Contact/Contact";

function AdminRoutes(props) {
  const crudContext = useContext(CrudContext);
  console.log(crudContext);
  return (
    <div className={crudContext}>
      <Layout>
        <Routes>
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/facilities" element={<Facilities />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/counter" element={<Counter />} />
          <Route exact path="/coupon" element={<Coupon />} />
          <Route exact path="/contextcrud" element={<Crud />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default AdminRoutes;
