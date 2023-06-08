import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.listCart.cartItems);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, cur) => acc + Number(cur.quantity) * Number(cur.price),
        0
      )
    );
  }, [cart]);
  return (
    <div className=" container">
      <div className=" m-5 py-5 bg-light">
        <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
          <div className="col-lg-6">
            <h1 className="h2 text-uppercase mb-0">CHECKOUT</h1>
          </div>
          <div className="col-lg-6 text-lg-right">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                <li>
                  <Link className=" text-decoration-none text-black" to="/">
                    HOME{" "}
                  </Link>
                  <span className=" fw-bold">&ensp;/</span>
                </li>
                <li>
                  <Link className=" text-decoration-none text-black" to="/cart">
                    &ensp;CART{" "}
                  </Link>
                  <span className=" fw-bold">&ensp;/</span>
                </li>
                <li className=" text-black-50">&ensp;CHECKOUT</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className=" px-5">
        <h4 className=" pb-3">BILLING DETAILS</h4>
        <div className=" row ">
          <div className=" col-sm-8 ">
            <form>
              <div>
                <label htmlFor="">FULL NAME</label>
                <input
                  className=" p-2 my-2"
                  type="text"
                  placeholder="Enter Your Full Name Here!"
                />
              </div>
              <div>
                <label htmlFor="">EMAIL</label>
                <input
                  className=" p-2 my-2"
                  type="text"
                  placeholder="Enter Your Email Here!"
                />
              </div>
              <div>
                <label htmlFor="">PHONE NUMBER</label>
                <input
                  className=" p-2 my-2"
                  type="text"
                  placeholder="Enter Your Phone Number Here!"
                />
              </div>
              <div>
                <label htmlFor="">ADDRESS</label>
                <input
                  className=" p-2  my-2"
                  type="text"
                  placeholder="Enter Your Address Here!"
                />
              </div>
              <button className=" px-3 py-2 bg-black text-white my-2">
                Place Order
              </button>
            </form>
          </div>
          <div
            className=" col-4 bg-light p-5"
            style={{ height: "max-content" }}
          >
            <h3>YOUR ORDER</h3>
            {cart.map((cartItem) => (
              <>
                <div className=" d-flex">
                  <p className=" fw-bold" style={{ flex: 2 }}>
                    {cartItem.name}
                  </p>
                  <div className=" d-flex gap-1 text-black-50 ">
                    <p>
                      {cartItem.totalPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </p>
                    <span>x</span>
                    <p className=" text-black-50">{cartItem.quantity}</p>
                  </div>
                </div>
                <hr />
              </>
            ))}
            <div className=" d-flex justify-content-between">
              <p className=" fw-bold">TOTAL</p>
              <p className=" text-black-50 fs-5">
                {total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
