import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { TitleProvider } from "./context/TitleContext";
import RegisterPage from "./pages/login/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import Header from "./components/Header";
import UserInfoPage from "./pages/UserInfoPage";

function App() {
  return (
    <TitleProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/main" element={<div>메인 페이지</div>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/info" element={<UserInfoPage/>} />
        </Routes>
      </Router>
    </TitleProvider>
  );
}

export default App;
