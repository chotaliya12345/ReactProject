import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeProduct,
} from "../../../Redux/slice/cart.slice";
import { getCoupon } from "../../../Redux/slice/counpon.slice";
import { useFormik } from "formik";
import { object, string } from "yup";
import { TextField } from "@mui/material";

function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product);
  const coupon = useSelector((state) => state.coupon);
  console.log(coupon);


  const productData = cart.cart.map((v) => {
    const product = products.product.find((v1) => v1.id === v.pid);

    return { ...product, qty: v.qty };
  });


  const subTotal = productData.reduce((acc, v) => acc + v.qty * v.price, 0);
  const Total = subTotal * 1.18;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupon());
  }, []);

  const handleInc = (id) => {
    console.log(id);
    dispatch(incrementQty(id));
  };

  const handleDec = (id) => {
    console.log(id);
    dispatch(decrementQty(id));
  };

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const handleCoupon = (data) => {
    console.log(data);
    if (data.coupon === coupon.coupon && data.date === coupon.expiry) {

    }
  }

  let cartSchema = object({
    cart: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      cart: "",
    },
    validationSchema: cartSchema,
    onSubmit: (values) => {
      handleCoupon({...values, date:new Date().toLocaleDateString()})
    },
  });

  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    formik;
  return (
    <div>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Cart Page Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((p) => (
                  <tr>
                    <th scope="row">
                      <div className="d-flex align-items-center">
                        <img
                          src={p.image}
                          className="img-fluid me-5 rounded-circle"
                          style={{ width: 80, height: 80 }}
                          alt
                        />
                      </div>
                    </th>
                    <td>
                      <p className="mb-0 mt-4">{p.name}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{p.price} $</p>
                    </td>
                    <td>
                      <div
                        className="input-group quantity mt-4"
                        style={{ width: 100 }}
                      >
                        <div className="input-group-btn">
                          <button
                            onClick={() => handleDec(p.id)}
                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                          >
                            <i className="fa fa-minus" />
                          </button>
                        </div>
                        <span
                          type="text"
                          className="form-control form-control-sm text-center border-0"
                        >
                          {p.qty}
                        </span>
                        <div className="input-group-btn">
                          <button
                            onClick={() => handleInc(p.id)}
                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{p.qty * p.price} $</p>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemove(p.id)}
                        className="btn btn-md rounded-circle bg-light border mt-4"
                      >
                        <i className="fa fa-times text-danger" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="cart"
                class="border-0 border-bottom rounded me-5 py-3 mb-4"
                placeholder="Coupon Code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.coupon}
                error={touched.coupon && errors.coupon ? true : false}
                helperText={
                  touched.coupon && errors.coupon ? errors.coupon : ""
                }
              />
              <button
                class="btn border-secondary rounded-pill px-4 py-3 text-primary"
                type="submit"
              >
                Apply Coupon
              </button>
            </form>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8" />
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">
                    Cart <span className="fw-normal">Total</span>
                  </h1>
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0 me-4">Subtotal:</h5>
                    <p className="mb-0">${subTotal}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 me-4">Shipping</h5>
                    <div className>
                      <p className="mb-0">Flat rate: $1.18</p>
                    </div>
                  </div>
                  <p className="mb-0 text-end">Shipping to Ukraine.</p>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Total</h5>
                  <p className="mb-0 pe-4">{Total}</p>
                </div>
                <button
                  className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                  type="button"
                >
                  Proceed Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Page End */}
    </div>
  );
}

export default Cart;
