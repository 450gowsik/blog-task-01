import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BlogList from "./BlogList";
import BlogDetail from "./BlogDetail";
import Login from "./Login";
import blogsData from "./blogs.json";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("loggedIn") === "true"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isLoggedIn) localStorage.setItem("loggedIn", "true");
    else localStorage.removeItem("loggedIn");
  }, [isLoggedIn]);

  const filteredBlogs = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return blogsData.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const Protected = ({ children }) =>
    isLoggedIn ? children : <Navigate to="/login" replace />;

  return (
    <Router>
      <div className="main">
        <div className="container">
          <Routes>
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/"
              element={
                <Protected>
                  <h1 className="page-title">📖 My Blog</h1>
                  <BlogList
                    blogs={filteredBlogs}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </Protected>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <Protected>
                  <BlogDetail blogs={blogsData} />
                </Protected>
              }
            />
            {/* catch-all -> home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
