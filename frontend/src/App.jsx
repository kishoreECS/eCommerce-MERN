import { useState } from "react";
import "./App.css";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import Home from "./components/layouts/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <Router>
        <div>
          <HelmetProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </HelmetProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
