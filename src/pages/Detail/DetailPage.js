import React, { Fragment, useEffect, useState } from "react";
import "./DetailPage.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../Data/data";
import ListProducts from "../../components/Products/ListProducts";
import { addToCart } from "../../Redux/cartSlice";
import { toast } from "react-toastify";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const DetailPage = () => {
  const history = useHistory();

  const isLogin = useSelector((state) => state.login.isLogin);
  console.log(isLogin);

  const { id } = useParams();
  const [products, setProducts] = useState();

  const [productCurrent, setProductCurrent] = useState();
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [currentImage, setCurrentImage] = useState();
  // Lưu id của sản phẩm đang được xem
  const [currentProductId, setCurrentProductId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();

      if (data) {
        setProducts(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (products && id) {
      const productCurrent1 = products.find((pr) => pr._id.$oid === id);
      if (productCurrent1 !== undefined) {
        setProductCurrent(productCurrent1);
        setCurrentImage(productCurrent1.img1);
        setCurrentProductId(productCurrent1._id.$oid);
        setRelatedProducts(
          products.filter(
            (product) => product.category === productCurrent1.category
          )
        );
      }
    }
  }, [products, id, currentProductId]);
  console.log(products);
  console.log(relatedProducts);
  console.log(productCurrent);

  // xác định số lượng tăng giảm
  const [qty, setQty] = useState(1);
  const handleQuantityHighter = () => {
    setQty(qty + 1);
  };
  const handleQuantityLower = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // thêm sản phẩm vào giỏ hàng
  const addToCartHandle = () => {
    if (isLogin) {
      const newItem = { ...productCurrent, qty };
      console.log({ newItem });
      let totalPrice = qty * productCurrent.price;

      const tempProduct = {
        ...productCurrent,
        quantity: qty,
        totalPrice,
      };
      console.log(tempProduct);

      // Thực hiện dispatch action để thêm sản phẩm vào giỏ hàng

      dispatch(addToCart(tempProduct));

      // Chuyển đến trang giỏ hàng
      history.push("/cart");
    } else {
      // thông báo yêu cầu người dùng đăng nhập
      toast.error("Please login");
      // Lưu trữ trang hiện tại vào localStorage
      localStorage.setItem("redirectUrl", "/cart");
      history.push("/login");
    }
  };
  const handleRelatedProductClick = (e, product) => {
    // cập nhật sản phẩm hiện tại của trang bằng sản phẩm được click. Sau đó, hàm cập nhật lại ảnh hiển thị của sản phẩm bằng cách sử dụng setCurrentImage và truyền vào đường dẫn ảnh của sản phẩm được click.
    setProductCurrent(product);
    setCurrentImage(product.img1);
  };

  return productCurrent !== undefined ? (
    <div className=" container mt-5 pt-5">
      <div className=" m-5 ">
        <div className="row">
          <div className=" ps-5 col-lg-2 d-flex flex-column gap-2">
            <div className="  w-100">
              <img
                className=" w-50"
                src={productCurrent.img1}
                onClick={() => setCurrentImage(productCurrent.img1)}
                alt=""
              />
            </div>
            <div className="  w-100 ">
              <img
                className=" w-50"
                src={productCurrent.img2}
                onClick={() => setCurrentImage(productCurrent.img2)}
                alt=""
              />
            </div>
            <div className="  w-100">
              <img
                className=" w-50"
                src={productCurrent.img3}
                onClick={() => setCurrentImage(productCurrent.img3)}
                alt=""
              />
            </div>
            <div className="  w-100">
              <img
                className=" w-50"
                src={productCurrent.img4}
                onClick={() => setCurrentImage(productCurrent.img4)}
                alt=""
              />
            </div>
          </div>
          <div className=" col-lg-4 ">
            <img src={currentImage} alt="" />
          </div>
          <div className=" col-lg-6 d-flex flex-column gap-2 pe-5">
            <h1>{productCurrent.name}</h1>

            <p>
              {productCurrent.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
            </p>
            <span>{productCurrent.short_desc}</span>
            <p className=" fw-bold fst-italic">
              CATEGORY:{" "}
              <span className=" text-muted fw-normal ">
                {productCurrent.category}
              </span>
            </p>
            <div className="quantity d-flex">
              <div
                className="quantity__input position-relative w-50 "
                style={{ height: "40px" }}
              >
                <input
                  className=" w-100 h-100 ps-2 "
                  type=""
                  name=""
                  id=""
                  placeholder="QUANTITY"
                  disabled
                />

                <div className=" position-absolute top-50 translate-middle-y end-0 pe-2 d-flex gap-2">
                  <span onClick={handleQuantityLower}>
                    <IoMdArrowDropleft />
                  </span>
                  <span>{qty}</span>
                  <span onClick={handleQuantityHighter}>
                    <IoMdArrowDropright />
                  </span>
                </div>
              </div>
              <button
                className=" bg-black px-2 h-100 text-white "
                onClick={() => addToCartHandle()}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className=" m-5">
          <button className=" bg-black p-2 my-3 text-white">DESCRIPTION</button>
          <h5 className=" fst-italic">PRODUCT DESCRIPTION</h5>
          <span className=" my-5 space">{productCurrent.long_desc}</span>
          <br />
          <h5 className=" fst-italic my-5 ">RELATED PRODUCTS</h5>
          <div className="related-product">
            {relatedProducts &&
              relatedProducts.map((product) => (
                <div key={product._id.$oid} className="product-container">
                  {/* Kiểm tra nếu id của sản phẩm không giống với id sản phẩm đang xem thì mới render sản phẩm đó */}
                  {product._id.$oid !== currentProductId && (
                    <div key={product._id.$oid}>
                      <ListProducts
                        // Để hiển thị một sản phẩm trong danh sách sản phẩm, nó cần được đưa vào một mảng
                        products={[product]}
                        onClick={handleRelatedProductClick}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default DetailPage;
