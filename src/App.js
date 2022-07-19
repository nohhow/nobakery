import { useEffect, useState } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import HeaderNav from "./components/HeaderNav";
import CartPage from "./pages/CartPage";
import InfoPage from "./pages/InfoPage";
import ItemDetail from "./pages/OrderPage/ItemDetail";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import OrderPage from "./pages/OrderPage";
import Auth from "./components/Auth";
import Profile from "./pages/LoginPage/Profile";
import Verify from "./pages/LoginPage/Verify";
import AdminPage from "./pages/AdminPage";
import OrderComplete from "./pages/CartPage/OrderComplete";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const locateState = useLocation().state;

  useEffect(() => {
    const userId = localStorage.getItem('id');
    console.log('App rendering', userId);
    if (userId) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [locateState]);

  const Layout = () => {
    return (
      <div>
        <HeaderNav isLogin={isLogin} handleLogin={setIsLogin}/>
        <Outlet />
        <Footer />
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="about" element={<InfoPage />}></Route>
          <Route path=":itemId" element={<ItemDetail />}></Route>
          <Route path="order" element={<OrderPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="join" element={<JoinPage />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
          <Route path="order-complete" element={<OrderComplete/>}></Route>
          <Route path="/oauth/kakao/callback" element={<Auth />}></Route>
          <Route path="/verify" element={<Verify/>}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin" element={<AdminPage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
