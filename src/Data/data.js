import axios from "axios";

const API_URL =
  "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

// gửi một GET request tới đường dẫn API_URL. Nếu thành công, nó trả về dữ liệu sản phẩm trong response dưới dạng JSON.
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
console.log(getProducts());
