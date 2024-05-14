import React, { useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import LoginPage from "./views/login/loginPage";
import NewBlogPost from "./views/new/New";
import RegisterUser from "./views/login/registerUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import GoogleAuth from "./components/googleAuth";
import TokenContextProvider from "./context/tokenContext.provider";

function App() {
  const [token, setToken] = useState("");
  return (
    <>
      <Router>
        {/* <NavBar /> */}
        <TokenContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              exact
              element={
                <>
                  <NavBar />
                  <Home />
                </>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <>
                  {" "}
                  <NavBar /> <Blog />{" "}
                </>
              }
            />
            <Route
              path="/new"
              element={
                <>
                  {" "}
                  <NavBar /> <NewBlogPost />{" "}
                </>
              }
            />
            <Route path="/register" element={<RegisterUser />} />
          </Routes>
          <Footer />
        </TokenContextProvider>
      </Router>
    </>
  );
}

export default App;
