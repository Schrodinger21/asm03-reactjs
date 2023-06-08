import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import validation from "../../schema/validation";

const RegisterPage = () => {
  const history = useHistory();
  const onSubmit = (
    values,
    { resetForm, setError, setSubmitting, setTouched }
  ) => {
    // Lưu thông tin người dùng vào localStorage
    let userArr = JSON.parse(localStorage.getItem("userArr")) || [];
    const user = userArr.find((user) => user.email === values.email);
    if (user) {
      toast.error("Email đã được sử dụng!", { autoClose: 5000 });
      setSubmitting(false);
      return;
    }
    userArr.push(values);
    localStorage.setItem("userArr", JSON.stringify(userArr));
    // Thông báo đăng ký thành công
    toast.success("Đăng ký thành công!", { autoClose: 5000 });
    resetForm();
    setSubmitting(false);
    setTouched({});
    history.push("/login");
    // console.log();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit,
  });

  return (
    <div className=" container">
      <div className="register-container p-5 ">
        <form
          className="px-5 shadow form-group"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3 className=" text-center p-5">Sign Up</h3>

          <input
            id="fullName"
            type="text"
            placeholder="Full name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.fullName && touched.fullName ? "input-error" : ""}
          />
          {errors.fullName && touched.fullName && (
            <p className="error">{errors.fullName}</p>
          )}
          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Email"
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          <p className="error my-0" id="email"></p>
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
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}

          <input
            id="phone"
            type="text"
            placeholder="Phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone && touched.phone ? "input-error" : ""}
          />
          {errors.phone && touched.phone && (
            <p className="error">{errors.phone}</p>
          )}
          <button
            className=" btn btn-dark py-3 w-100 rounded-0 my-2"
            disabled={isSubmitting}
            type="submit"
          >
            Sign up
          </button>
          <p className=" text-center p-5 m-auto">
            Login ?{" "}
            <Link className=" text-decoration-none" to="/login">
              Click
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
