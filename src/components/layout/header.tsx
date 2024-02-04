import { useContext, useState } from "react";
import Logo from "./../../../public/logo-white.png";
import { Link } from "react-router-dom";
import MenuBar from "../../assets/icons/menu";
import UserContext from "../../context/user-context";
import { UserRoles } from "../../types/user";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user] = useContext(UserContext);
  const guestNavLink = [
    "about",
    "movies",
    "theaters",
    "my-movies",
    "my-theaters",
    "theater-halls",
  ];

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
          className={`
            ${isMenuOpen ? "visible" : "invisible"} 
            flex flex-col lg:flex-row absolute lg:relative lg:block lg:visible justify-between items-center w-full lg:w-auto lg:space-x-8
            bg-[#0f0f0ff2] lg:bg-transparent left-0 top-12 p-5 lg:top-0 
          `}
        >
          <Link
            onClick={() => {
              isMenuOpen && setMenuOpen(false);
            }}
            className={"nav-link-mobile lg:nav-link-desktop"}
            to={"/"}
          >
            Home
          </Link>
          {guestNavLink.map((link) => {
            return (
              <Link
                key={link}
                onClick={() => {
                  isMenuOpen && setMenuOpen(false);
                }}
                className={"nav-link-mobile lg:nav-link-desktop"}
                to={"/" + link}
              >
                {link.charAt(0).toUpperCase() + link.substring(1)}
              </Link>
            );
          })}
        </div>
      </nav>
      {user.role === UserRoles.GUEST ? (
        <nav className="flex items-center ">
          <Link
            to={"/login"}
            className="m-1 text-md font-bold text-gray-400 px-2 py-1 rounded-3xl hover:bg-transparent-1 hover:text-black"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="m-1 text-sm button px-6 py-2 text-white border border-white hover:bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 duration-300"
          >
            Register
          </Link>
        </nav>
      ) : (
        <nav className="flex items-center ">
          <Link
            to={"/profile"}
            className="m-1 text-sm button px-6 py-2 border text-white border-white hover:bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 duration-300"
          >
            Profile
          </Link>
        </nav>
      )}
      <nav className="block lg:hidden">
        <button className="p-2" onClick={toggleMenu}>
          <MenuBar width={25} height={25} />
        </button>
      </nav>
    </header>
  );
}
