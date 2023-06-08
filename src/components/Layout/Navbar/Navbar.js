import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { MdLogout, MdOutlineArrowDropDown } from "react-icons/md";
import { on_login, on_logout } from "../../../Redux/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // Lấy dữ liệu trang thái đăng nhập của người dùng.
  const isLogin = useSelector((state) => state.login.isLogin);
  const userActive = useSelector((state) => state.login.content);
  console.log(userActive);
  const getUser = localStorage.getItem("on_login");
  // console.log(getUser);
  console.log(isLogin);

  useEffect(() => {
    //  nếu biến getUser không phải null (nghĩa là đã có thông tin đăng nhập được lưu trữ trong localStorage)
    if (getUser !== null) {
      // gọi action on_login của Redux với tham số là thông tin đăng nhập được lấy từ localStorage
      dispatch(on_login(JSON.parse(getUser)));
      console.log(userActive);
    }
  }, []);

  // xóa thông tin đăng nhập của người dùng khỏi localStorage và gọi action on_logout của Redux để đăng xuất người dùng.
  const logoutHandle = () => {
    localStorage.removeItem("on_login");
    dispatch(on_logout());
  };

  return (
    <div className="container px-lg-3">
      <nav
        className="navbar navbar-expand-lg navbar-light py-2 px-5 justify-content-between"
        style={{
          cursor: "pointer",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <ul className="navbar-nav fs-5">
          <li
            className="nav-item px-3"
            style={{ color: "#e9cc99" }}
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </li>
          <li
            className="nav-item"
            onClick={() => {
              history.push("/shop");
            }}
          >
            Shop
          </li>
        </ul>
        <span
          className="navbar-brand font-weight-bold text-uppercase fs-3 text-dark"
          onClick={() => {
            history.push("/");
          }}
        >
          Boutique
        </span>
        <ul className="navbar-nav fs-5">
          <li
            className="nav-item px-3"
            onClick={() => {
              history.push("/cart");
            }}
          >
            <FaCartPlus className="nav-icon" />
            Cart
          </li>
          {/* Nếu người dùng chưa đăng nhập (isLogin = false), sẽ hiển thị một thẻ li chứa biểu tượng đăng nhập và chữ "Login". Nếu người dùng nhấp vào thẻ li, trình duyệt sẽ điều hướng đến trang đăng nhập. */}
          {!isLogin && (
            <li
              className="nav-item"
              onClick={() => {
                history.push("/login");
              }}
            >
              <FaUser />
              Login
            </li>
          )}
          {/* Nếu người dùng đã đăng nhập (isLogin = true), sẽ hiển thị tên người dùng đã đăng nhập. */}
          {isLogin && (
            <span>
              <FaUser className="nav-icon" />
              {userActive.name}
              <MdOutlineArrowDropDown className="nav-icon" />
            </span>
          )}
          {/* Đăng xuất thông  */}
          {isLogin && (
            <span onClick={logoutHandle} style={{ paddingLeft: 10 }}>
              <MdLogout className="nav-icon" />
            </span>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
