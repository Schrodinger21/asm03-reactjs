import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import banner1 from "../../assets/images/banner1.jpg";
import product_1 from "../../assets/images/product_1.png";
import product_2 from "../../assets/images/product_2.png";
import product_3 from "../../assets/images/product_3.png";
import product_4 from "../../assets/images/product_4.png";
import product_5 from "../../assets/images/product_5.png";
import { showPopup } from "../../Redux/popupSlice";
import Popup from "../../components/Popup/Popup";
import { getProducts } from "../../Data/data";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.popup.show);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      // Lấy 8 sản phẩm đầu tiên từ danh sách và cập nhật state "products"
      setProducts(data.slice(0, 8));
    };
    fetchProducts();
  }, []);
  // Đối số thứ hai của useEffect là một mảng chứa các dependencies. Trong trường hợp này, mảng rỗng có nghĩa là useEffect chỉ được gọi một lần khi component được render lần đầu tiên

  console.log(products);

  const showPopupHandler = (product) => {
    // Hàm showPopupHandler được gọi khi người dùng click vào một sản phẩm, và dispatch một action đến Redux store để hiển thị popup
    dispatch(showPopup(product));
    // setShow(true);
  };

  return (
    <div>
      <section className="position-relative p-5 mt-4">
        <img src={`${banner1}`} alt="" className="homeImage img-fluid" />
        <div className="container position-absolute top-50 translate-middle-y ">
          <div className="row px-lg-5 ">
            <div className="">
              <p className="text-muted text-uppercase mb-2">
                New Inspiration 2020
              </p>
              <h1 className=" text-uppercase mb-3">20% off on new season</h1>
              <span
                className="btn btn-dark"
                onClick={() => history.push("/shop")}
              >
                Browse collections
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className=" p-5">
        <header className=" text-center  text-uppercase">
          <p className=" text-black-50">Carefully created collections</p>
          <h2>Browse our categories</h2>
        </header>
        <div className=" row ">
          <div className="category col-md-6 mb-sm-2 ">
            <img
              onClick={() => history.push("/shop")}
              className=" img-fluid w-100 h-auto"
              src={`${product_1}`}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </div>
          <div className="category col-md-6 mb-sm-2 ">
            <img
              onClick={() => history.push("/shop")}
              className="img-fluid w-100 h-auto"
              style={{ cursor: "pointer" }}
              src={`${product_2}`}
              alt=""
            />
          </div>
        </div>
        <div className=" row">
          <div className=" category col-md-6 col-lg-4">
            <img
              onClick={() => history.push("/shop")}
              className=" img-fluid w-100"
              src={`${product_3}`}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </div>
          <div className="category col-md-6 col-lg-4">
            <img
              onClick={() => history.push("/shop")}
              className=" img-fluid w-100"
              src={`${product_4}`}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </div>
          <div className="category col-md-6 col-lg-4">
            <img
              onClick={() => history.push("/shop")}
              className=" img-fluid w-100"
              src={`${product_5}`}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </div>
        </div>
      </section>
      <section>
        <header style={{ paddingLeft: 50 }}>
          <p className="text-muted text-uppercase mb-1">Made the hard way</p>
          <h2 className="h5 text-uppercase mb-4">Top trending products</h2>
        </header>
        <div className="row px-5">
          {products.map((product) => (
            <div
              key={product._id.$oid}
              className=" col-lg-3 col-md-6 col-sm-12 "
            >
              <div className="category">
                <img
                  style={{ cursor: "pointer" }}
                  className="img-fluid image "
                  onClick={() => showPopupHandler(product)}
                  src={product.img1}
                  alt=""
                />
              </div>
              <div className=" px-3">
                <p
                  style={{
                    fontWeight: "600",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  {product.name}
                </p>
                <p
                  className=" text-muted"
                  style={{ fontWeight: "600", textAlign: "center" }}
                >
                  {/* Định dạng giá tiền sản phẩm  */}
                  {product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  VND
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nếu isShow là false, thì đoạn code sẽ trả về một chuỗi rỗng (""). Ngược lại, nếu isShow là true, đoạn code sẽ trả về component Popup. */}
        {!isShow ? "" : <Popup />}
      </section>

      <section
        className=" bg-light d-flex justify-content-around p-5 m-3 flex-wrap"
        style={{ fontStyle: "italic" }}
      >
        <div>
          <h6 className="text-uppercase mb-1">Free shipping</h6>
          <p className="text-muted">Free shipping worlwide</p>
        </div>
        <div>
          <h6 className="text-uppercase mb-1">24 x 7 service</h6>
          <p className="text-muted">Free shipping worlwide</p>
        </div>
        <div>
          <h6 className="text-uppercase mb-1">Festival offer</h6>
          <p className="text-small mb-0 text-muted">Free shipping worlwide</p>
        </div>
      </section>
      <section className=" p-4 ">
        <div
          className=" d-flex flex-wrap justify-content-between"
          style={{ fontStyle: "italic" }}
        >
          <div className=" mb-3 px-5" style={{ flex: 1 }}>
            <h5 className="text-uppercase">Let's be friends!</h5>
            <p className=" text-muted mb-0">
              Nisi nisi tempor consequat laboris nisi.
            </p>
          </div>
          <div className=" d-flex align-items-center" style={{ flex: 1 }}>
            <input
              className=" p-3 col-lg-8"
              type="email"
              placeholder="Enter your email address"
              aria-describedby="button-addon2"
            />

            <button
              className=" btn-dark btn-block bg-black text-white p-3 col-lg-3"
              id="button-addon2"
              type="submit"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
