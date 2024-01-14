import { useState } from "react";
import Logo from "./../../../public/logo-white.png";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-[100%] bg-transparent-1 flex justify-between items-center text-white">
      <nav>
        <Link to={"/"} className="flex justify-between items-center">
          <img src={Logo} className="w-[50px]" alt="Flowbite Logo" />
          <span className="text-xl lg:text-xl font-semibold whitespace-nowrap">
            OneMovie
          </span>
        </Link>
      </nav>
      <nav className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl text-sm text-gray-300 font-semibold">
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } flex flex-col lg:flex-row lg:block justify-between items-center w-full lg:w-auto lg:space-x-8 `}
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/movies"}>Movies</Link>
          <Link to={"/time"}>Time Table</Link>
        </div>
      </nav>
      <nav className="flex items-center ">
        <Link to={"/login"} className="m-1 text-md font-semibold text-gray-400">
          Login
        </Link>
        <Link
          to={"/register"}
          className="m-1 text-sm button text-primary-600 border border-white hover:bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 duration-300"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}
