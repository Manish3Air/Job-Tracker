import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  const [authDropdown, setAuthDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real logic

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="px-6 mt-4 mb-2 fixed w-full z-50">
      <nav className="rounded-2xl bg-base-100 text-base-content border-b border-base-200 top-0 shadow">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 ">
          {/* Logo */}
          <div className="flex items-center bg-base-100 hover:bg-base-300 rounded-full p-2 transition">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
            JobTracker
          </Link>
          </div>

          {/* Desktop Links */}

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setAuthDropdown((prev) => !prev)}
                className="p-2 rounded hover:bg-base-200 transition"
                aria-label="Auth Menu"
              >
                <User size={22} />
              </button>
              {authDropdown && (
                <ul className="absolute right-0 mt-2 w-40 bg-base-100 border border-base-200 rounded-md shadow-lg z-50">
                  {!isAuthenticated ? (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-base-200"
                          onClick={() => setAuthDropdown(false)}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className="block px-4 py-2 hover:bg-base-200"
                          onClick={() => setAuthDropdown(false)}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-base-200"
                          onClick={() => setAuthDropdown(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setAuthDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-base-200"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenu((prev) => !prev)}
              className="p-2 rounded hover:bg-base-200 transition md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="relative md:hidden">
          <ul
            className={`absolute right-0 mt-2 w-48 bg-base-100 border border-base-200 rounded-md shadow-lg z-50 transition ${
              mobileMenu ? "block" : "hidden"
            }`}
          >
            
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-base-200"
                    onClick={() => setMobileMenu(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-base-200"
                    onClick={() => setMobileMenu(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-base-200"
                    onClick={() => setMobileMenu(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-base-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
