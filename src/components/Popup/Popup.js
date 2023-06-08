import React, { useSelector, useDispatch } from "react-redux";
import "./Popup.css";
import { hidePopup } from "../../Redux/popupSlice";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Popup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // Lấy dữ liệu từ redux store
  const isShow = useSelector((state) => state.popup.show);
  const selectedProduct = useSelector((state) => state.popup.product);
  console.log(isShow);
  console.log(selectedProduct);
  const hidePopupHandler = () => {
    //  dispatch để gửi một action đến reducer, từ đó thay đổi state của popup để ẩn popup đi.
    dispatch(hidePopup());
  };

  // Nếu không có sản phẩm nào được chọn (selectedProduct là null), thì hàm sẽ trả về null để không hiển thị gì cả.
  if (!selectedProduct) {
    return null;
  }

  return (
    <>
      <div className="overlay">
        <div className="modalContainer">
          <div className="content">
            <img src={selectedProduct.img1} alt={selectedProduct.name} />
            <div className="content-info">
              <h2>{selectedProduct.name}</h2>
              <p>
                {selectedProduct.price
                  ? selectedProduct.price.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    ) + " VND"
                  : ""}
              </p>
              <p className=" text-muted ">{selectedProduct.short_desc}</p>

              <div className="ps-4 pb-4">
                <button
                  className="btnPrimary"
                  onClick={() => history.push("/cart")}
                >
                  <FaShoppingCart className="pe-1 pt-1 h5" />
                  View Detail
                </button>
              </div>
            </div>
          </div>
          <div className="img-fluid">
            <button className="btn-close" onClick={hidePopupHandler}></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
