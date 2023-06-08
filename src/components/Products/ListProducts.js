import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import "./style.css";

const ListProducts = ({ products }) => {
  return (
    <div className="list-products">
      {products &&
        products.map((product) => (
          <div
            key={product._id.$oid}
            className="list-products__item 
          "
          >
            <Fade bottom cascade>
              <Link to={`/detail/${product._id.$oid}`}>
                <img className="img-fluid" src={product.img1} alt="" />
              </Link>
              <div className="text-center">
                <p className="fw-bold">{product.name}</p>
                <span className="text-muted">
                  {product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  VND
                </span>
              </div>
            </Fade>
          </div>
        ))}
    </div>
  );
};

export default ListProducts;
