import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../utils/ThemeContext";
import { Monitor, Moon, Sun, Menu, X } from "lucide-react";
import Logo from "../../assets/icons/logo.png";
import LogoDark from "../../assets/icons/logo-dark.png";

const CommonNavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themes = [
    { value: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
    { value: "system", label: "System", icon: <Monitor className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = ["Home", "About", "Contact"];

  const navLinkStyle = `cursor-pointer font-bold text-[var(--color-light)] ${
    theme === "light" || theme === "system"
      ? "hover:text-[var(--theme-color-dark)]"
      : "hover:text-[var(--theme-color)]"
  }`;

  return (
    <nav
      className={`w-full md:px-10 md:py-4 px-5 py-2 flex justify-between items-center z-5 fixed top-2  ${
        theme === "light" || theme === "system"
          ? "bg-gradient-to-b from-[var(--theme-color)] to-[var(--theme-light)]"
          : "bg-gradient-to-t from-[var(--theme-color-dark)] to-[var(--theme-light-dark)]"
      }`}
    >
      {/* Logo */}
      {theme === "light" && <img src={Logo} alt="logo" className="w-8 object-contain" />}
      {theme === "dark" && <img src={LogoDark} alt="logo" className="w-8 object-contain" />}
      {theme === "system" && <img src={Logo} alt="logo" className="w-8 object-contain" />}

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <li key={link} className={navLinkStyle}>
            {link}
          </li>
        ))}

        {/* Theme Dropdown */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 px-3 py-2 transition"
          >
            {theme === "light" && <Sun className="w-4 h-4 text-white" />}
            {theme === "dark" && <Moon className="w-4 h-4 text-white" />}
            {theme === "system" && <Monitor className="w-4 h-4 text-white" />}
            <svg
              className={`w-4 h-4 text-white transform transition-transform ${
                openDropdown ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
              {themes.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setTheme(item.value);
                    setOpenDropdown(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    theme === item.value
                      ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-[100%] left-0 w-full flex flex-col items-start bg-white dark:bg-gray-900 px-6 py-4 gap-4 transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {navLinks.map((link) => (
          <span key={link} className={`${navLinkStyle} text-lg`}>
            {link}
          </span>
        ))}

        <div className="w-full border-t border-gray-300 dark:border-gray-700 pt-3">
          <span className="text-gray-500 text-sm mb-1 block">Theme</span>
          {themes.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setTheme(item.value);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-2 py-1 text-left rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                theme === item.value ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CommonNavBar;

