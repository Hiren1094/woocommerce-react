import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header/Header";
import Logout from "./components/Logout/Logout";
import Checkout from "./pages/Checkout";
import { ApolloProvider } from "@apollo/client/react";
import AuthVerify from "./components/Login/AuthVerify";
import client from "./lib/apollo";
import './App.css';

export default function App() {
  
  return (
    <ApolloProvider client={client}>
      <Header />
      <Routes>
        <Route path="/" element={<AuthVerify><ProductPage /></AuthVerify>} />
        <Route path="/blog/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path="/product/:slug" element={<AuthVerify><ProductDetail /></AuthVerify>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<AuthVerify><CartPage /></AuthVerify>} />
        <Route path="/checkout" element={<AuthVerify><Checkout /></AuthVerify>} />
      </Routes>
    </ApolloProvider>
  );
}
