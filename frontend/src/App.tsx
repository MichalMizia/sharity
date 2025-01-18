import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthenticatedRoute from "./components/AuthenticateRoute";
import AuthRoute from "./components/AuthRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import AddProductPage from "./pages/profile/AddProductPage";
import ProductPage from "./pages/ProductPage";
import BuyProductPage from "./pages/BuyProductPage";
import BoughtProductPage from "./pages/profile/BoughtProductPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route element={<AuthenticatedRoute />}>
            <Route path="products/:id/purchase" element={<BuyProductPage />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
          </Route>
          <Route element={<AuthenticatedRoute />}>
            {/* authenticated routes */}

            <Route path="profile">
              <Route index element={<ProfilePage />} />
              <Route
                path="bought-products/:id"
                element={<BoughtProductPage />}
              />
              <Route path="add-product" element={<AddProductPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
