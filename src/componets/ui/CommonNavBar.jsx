import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../utils/ThemeContext";
import { Monitor, Moon, Sun } from "lucide-react";

const CommonNavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themes = [
    { value: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
    { value: "system", label: "System", icon: <Monitor className="w-4 h-4" /> },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`w-screen p-5 flex justify-between items-center ${theme === "light" || theme === "system" ? "bg-gradient-to-b from-[var(--theme-color)] to-[var(--theme-light)]":"bg-gradient-to-t from-[var(--theme-color-dark)] to-[var(--theme-light-dark)]"}`}
    >
      <div className="w-1/5">logo</div>
      <ul className="flex items-center gap-2">
        <li
          className={`cursor-pointer font-bold  text-[var(--color-light)]  ${
            theme === "light" || theme === "system"
              ? "hover:text-[var(--theme-color-dark)]"
              : "hover:text-[var(--theme-color)]"
          }`}
        >
          Home
        </li>
        <li
          className={`cursor-pointer font-bold  text-[var(--color-light)]  ${
            theme === "light" || theme === "system"
              ? "hover:text-[var(--theme-color-dark)]"
              : "hover:text-[var(--theme-color)]"
          }`}
        >
          About
        </li>
        <li
          className={`cursor-pointer font-bold  text-[var(--color-light)]  ${
            theme === "light" || theme === "system"
              ? "hover:text-[var(--theme-color-dark)]"
              : "hover:text-[var(--theme-color)]"
          }`}
        >
          Contact
        </li>

        <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 transition"
      >
        {theme === "light" && <Sun className="w-4 h-4 text-white" />}
        {theme === "dark" && <Moon className="w-4 h-4 text-white" />}
        {theme === "system" && <Monitor className="w-4 h-4 text-white" />}
        <svg
          className={`w-4 h-4 text-white transform transition-transform ${
            open ? 'rotate-0' : 'rotate-90'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
          {themes.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setTheme(item.value);
                setOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === item.value
                  ? 'bg-gray-100 dark:bg-gray-700 font-semibold'
                  : 'text-gray-700 dark:text-gray-200'
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


    </nav>
  );
};

export default CommonNavBar;
