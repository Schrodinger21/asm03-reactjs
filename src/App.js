import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-chatbot-kit/build/main.css";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar/Navbar";
import DetailPage from "./pages/Detail/DetailPage";
import ShopPage from "./pages/Shop/ShopPage";
import CartPage from "./pages/Cart/CartPage";
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/Register/RegisterPage";
import Footer from "./components/Layout/Footer/Footer";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import LoginPage from "./pages/Login/LoginPage";
import Chat from "./chat/Chatbot";

function App() {
  // const isLogin = useSelector((state) => state.login.isLogin);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route path="/checkout">
          <CheckoutPage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
      </Switch>
      <Chat />

      <Footer />
    </div>
  );
}

export default App;
