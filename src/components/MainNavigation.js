import { NavLink } from "react-router-dom";

import logo from "../assets/logo.jpg";

const MainNavigation = () => {
  return (
    <nav className="container mx-auto flex justify-between py-4 bg-white z-10">
      <div className="flex items-center">
        <a className="mr-5 cursor-pointer">
          <h3 className="text-2xl font-medium text-blue-500">
            <img
              className="h-10 object-cover"
              src={logo}
              alt="Crypto Currency App Logo"
            />
          </h3>
        </a>

        <div className="items-center hidden space-x-8 lg:flex font-semibold">
          <NavLink
            to="/"
            className={(isActive) =>
              `flex hover:text-blue-500 cursor-pointer transition-colors duration-300 ${
                isActive ? "text-blue-500" : "text-gray-600"
              }`
            }
          >
            Cryptocurrency rates
          </NavLink>

          <a
            className="flex text-gray-600 
                    cursor-pointer transition-colors duration-300
                    text-blue-600"
          >
            Themes
          </a>

          <a
            className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300"
          >
            Developers
          </a>

          <a
            className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300"
          >
            Pricing
          </a>

          <a
            className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300"
          >
            Blog
          </a>

          <a
            className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300"
          >
            About Us
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <a className="flex text-blue-500 font-semibold cursor-pointer transition-colors duration-300">
          Login
        </a>
        <a
          className="flex text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-5
                    cursor-pointer transition-colors duration-300"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default MainNavigation;
