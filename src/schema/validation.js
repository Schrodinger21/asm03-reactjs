import * as Yup from "yup";

const validation = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name không được bỏ trống")
    .min(3, "Full name phải có ít nhất 3 kí tự")
    .max(50, "Full name không được vượt quá 50 kí tự"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
  password: Yup.string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
    .max(50, "Password must not exceed 50 characters"),
  phone: Yup.string()
    .required("Số điện thoại không được bỏ trống")
    .matches(/^\d+$/, "Phone must contain only numbers"),
});

export default validation;
