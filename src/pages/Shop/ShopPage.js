import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import Search from "./Search";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import SortProducts from "./SortProducts";
import ListProducts from "../../components/Products/ListProducts";
import { list_products } from "../../Redux/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Data/data";

const ShopPage = () => {
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([
    {
      cate: "IPHONE & MAC",
      child: ["iPhone", "iPad", "Macbook"],
    },
    {
      cate: "WIRELESS",
      child: ["Airpod", "Watch"],
    },
    {
      cate: "OTHER",
      child: ["Mouse", "Keyboard", "Other"],
    },
  ]);

  const listDetail = useSelector((state) => state.products.content);

  const [currentProducts, setCurrentProducts] = useState([]);
  // const [sortType, setSortType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setIsLoading(true);
      dispatch(list_products(data));
      setIsLoading(false);
      setCurrentProducts(data);
    };

    fetchData();
  }, [dispatch]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // Lọc sản phẩm theo danh mục
  const filterProductsByCategory = (category) => {
    setCategory(category);
    setKeyword("");
  };

  // Lọc sản phẩm theo từ khóa
  const filterProductsByKeyword = (keyword) => {
    setKeyword(keyword);
    setCategory("");
  };

  // Sắp xếp sản phẩm theo giá
  const sortProductsByPrice = (sortOption) => {
    setSortOption(sortOption);
  };

  const filteredProducts = useMemo(() => {
    let result = listDetail;
    console.log(result);

    // Lọc sản phẩm theo danh mục
    if (category) {
      if (category === "all") {
        result = listDetail;
      } else {
        result = result.filter((product) => product.category === category);
      }
    }

    // Lọc sản phẩm theo từ khóa
    if (keyword) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Sắp xếp sản phẩm theo giá
    if (sortOption === "DownToUp") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "UpToDown") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    console.log(sortOption);
    console.log(result);

    return result;
  }, [listDetail, category, keyword, sortOption]);

  return (
    <>
      <div>
        <div className="container">
          <div className=" m-5 py-5 bg-light">
            <div className="container">
              <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                <div className="col-lg-6">
                  <h1 className="h2 text-uppercase mb-0">Shop</h1>
                </div>
                <div className="col-lg-6 text-lg-right">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Shop
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="shop-container">
            <div className="shop-nav">
              <h5 className="text-uppercase mb-4 fst-italic">Categories</h5>
              <p className=" bg-black text-white px-4 py-2">APPLE</p>

              <div className="px-4">
                <div className="shop__childen" style={{ margin: "15px 0px" }}>
                  <span
                    className=" text-muted nav-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => filterProductsByCategory("all")}
                  >
                    All
                  </span>
                </div>
              </div>
              {categoryList.map((cate, index) => (
                <div key={index} className="nav-content">
                  <div className=" bg-light px-4 py-2 fw-bold fst-italic">
                    <span>{cate.cate}</span>
                  </div>
                  <div className=" px-4 py-2">
                    {cate.child.map((child, index) => (
                      <div key={index} className=" py-2">
                        <span
                          className="nav-title"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            filterProductsByCategory(child.toLowerCase())
                          }
                        >
                          {child}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="shop-product ">
              <div className="row mb-3 align-items-center">
                <Search onSearch={filterProductsByKeyword} />
                <div className="col-lg-8">
                  <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                    <li className="list-inline-item">
                      <SortProducts handlerChangeSort={sortProductsByPrice} />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product-container">
                <div className="product-list">
                  {isLoading ? (
                    // Nếu isLoading === true thì hiển thị thông báo "Loading"
                    <p>Loading...</p>
                  ) : // Nếu không có sản phẩm thỏa mãn điều kiện lọc thì hiển thị thông báo "Không tìm thấy sản phẩm"
                  filteredProducts.length === 0 ? (
                    <p>Không tìm thấy sản phẩm</p>
                  ) : (
                    // Nếu có sản phẩm thỏa mãn điều kiện lọc thì hiển thị danh sách sản phẩm
                    <ListProducts
                      products={filteredProducts}
                      onClick={() => console.log(filteredProducts._id)}
                    />
                  )}

                  <div className="row ">
                    <div className=" col-lg-12">
                      <div className=" d-flex justify-content-end">
                        <button>
                          <FaAngleDoubleLeft />
                        </button>
                        <span className=" px-3 border border-dark text-white bg-black">
                          1
                        </span>
                        <button>
                          <FaAngleDoubleRight />
                        </button>
                      </div>
                      <p className=" text-end">Show 1-9 of 9 results</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShopPage;
