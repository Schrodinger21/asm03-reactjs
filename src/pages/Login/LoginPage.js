import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { on_login } from "../../Redux/loginSlice";

// khi reload tải lại trang thì tất cả các biến trong redux đều sẽ bị reset về trạng thái ban đầu, nó chỉ ko đổi trong quá trình thao tác nhảy qua nhảy lại giữa các trang. Vì vậy phải dùng localStore của trình duyệt để duy trì đăng nhập khi tải lại trang

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef();

  const [redirectToCart, setRedirectToCart] = useState(false);
  // xác định liệu người dùng có chuyển từ trang CartPage sang trang LoginPage không.

  const onSubmit = (value) => {
    const userArr = JSON.parse(localStorage.getItem("userArr")) || [];

    const matchedUser = userArr.find(
      (user) => user.email === value.email && user.password === value.password
    );
    if (matchedUser) {
      const userActive = {
        email: matchedUser.email,
        password: matchedUser.password,
        name: matchedUser.fullName,
      };
      toast.success("Đăng nhập thành công!", { autoClose: 5000 });

      dispatch(on_login(userActive));
      localStorage.setItem("on_login", JSON.stringify(userActive));

      // Kiểm tra nếu chuyển hướng từ trang DetailPage
      if (redirectToCart) {
        history.push("/cart");
      } else if (localStorage.getItem("redirectUrl")) {
        // Lấy URL trang trước đó lưu trong localStorage nếu có
        const prevPathname = localStorage.getItem("redirectUrl");
        localStorage.removeItem("redirectUrl");
        history.push(prevPathname);
      } else {
        history.push("/");
      }
    } else {
      // Nếu không tìm thấy user, hiển thị thông báo lỗi
      toast.error("Email hoặc mật khẩu không đúng");
    }
  };
  console.log(redirectToCart);
  // Tạo schema validation với Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit,
    });

  return (
    <div className="container">
      <div className="register-container">
        <div className="pt-5 w-50 m-auto">
          <form
            onSubmit={handleSubmit}
            className=" shadow p-3 mb-5 bg-white rounded form-group"
            action=""
          >
            <h3 className=" text-center p-5">Sign In</h3>
            <div className=" d-flex flex-column px-5">
              <input
                value={values.email}
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="Email"
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
              />
              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password ? "input-error" : ""
                }
              />
              {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}

              <p ref={ref} className="error"></p>

              <button
                type="submit"
                className="btn rounded-0 py-3 btn-dark text-center w-100"
              >
                SIGN IN
              </button>
              <p className=" p-5 m-auto">
                Creat an account ?{" "}
                <Link className=" text-decoration-none" to="/register">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
