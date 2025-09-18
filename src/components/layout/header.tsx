import { useContext, useEffect, useState } from "react"
import Logo from "./../../assets/images/logo-white.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import MenuBar from "../../assets/icons/menu"
import UserContext from "../../context/user-context"
import { ADMIN, CUSTOMER, GUEST, THEATER_EMPLOYEE } from "../../types/user"
import X from "../../assets/icons/x"
import constant from "../../configs/constant"

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useContext(UserContext)
  const location = useLocation()
  const [scrollPosition, setScrollPosition] = useState(window.screenY)
  const navigate = useNavigate()

  // location.pathname === "/"
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogOut = () => {
    setUser({ role: GUEST })
    localStorage.removeItem(constant.ACCESS_TOKEN)
    localStorage.removeItem(constant.USER_DETAIL)
    localStorage.removeItem(constant.USER_DETAIL)
    navigate("/login")
  }

  return (
    <header
      className={`fixed z-50 w-[100%] flex justify-between items-center text-white md:pe-5 pe-15 ${
        scrollPosition > 40 ? "bg-transparent-2" : "bg-transparent-1 "
      }`}
    >
      <nav className="md:ms-5 ms-15">
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
              isMenuOpen && setMenuOpen(false)
            }}
            className={`nav-link-mobile lg:nav-link-desktop ${
              location.pathname === "/" ? "active" : ""
            }`}
            to={"/"}
          >
            Home
          </Link>
          {
            user.role === ADMIN
              ? constant.adminNavLink.map((link: any) => {
                  return (
                    <Link
                      key={link}
                      onClick={() => {
                        isMenuOpen && setMenuOpen(false)
                      }}
                      className={`nav-link-mobile lg:nav-link-desktop ${
                        location.pathname === `/${link}` ? "active" : ""
                      }`}
                      to={"/" + link}
                    >
                      {link.charAt(0).toUpperCase() + link.substring(1)}
                    </Link>
                  )
                })
              : user.role === THEATER_EMPLOYEE
              ? constant.theaterNavLink.map((link: any) => {
                  return (
                    <Link
                      key={link}
                      onClick={() => {
                        isMenuOpen && setMenuOpen(false)
                      }}
                      className={`nav-link-mobile lg:nav-link-desktop ${
                        location.pathname === `/${link}` ? "active" : ""
                      }`}
                      to={"/" + link}
                    >
                      {link.charAt(0).toUpperCase() + link.substring(1)}
                    </Link>
                  )
                })
              : user.role === CUSTOMER
              ? constant.customerNavLink.map((link: any) => {
                  return (
                    <Link
                      key={link}
                      onClick={() => {
                        isMenuOpen && setMenuOpen(false)
                      }}
                      className={`nav-link-mobile lg:nav-link-desktop ${
                        location.pathname === `/${link}` ? "active" : ""
                      }`}
                      to={"/" + link}
                    >
                      {link.charAt(0).toUpperCase() + link.substring(1)}
                    </Link>
                  )
                })
            :
            constant.guestNavLink.map((link: any) => {
              return (
                <Link
                  key={link}
                  onClick={() => {
                    isMenuOpen && setMenuOpen(false)
                  }}
                  className={`nav-link-mobile lg:nav-link-desktop ${
                    location.pathname === `/${link}` ? "active" : ""
                  }`}
                  to={"/" + link}
                >
                  {link.charAt(0).toUpperCase() + link.substring(1)}
                </Link>
              )
            })
          }
        </div>
      </nav>
      {user.role === GUEST ? (
        <nav className="flex items-center ">
          <Link
            to={"/login"}
            className="m-1 text-md font-bold text-gray-400 px-2 py-1 rounded-3xl hover:bg-transparent-1 hover:text-black"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="m-1 text-sm button px-6 py-2 text-white border border-white hover:bg-black"
          >
            Register
          </Link>
        </nav>
      ) : (
        <nav className="flex items-center ">
          <button
            onClick={handleLogOut}
            className="m-1 text-sm button px-6 py-2 border text-white border-white hover:bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 duration-300"
          >
            Logout
          </button>
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
          {isMenuOpen ? (
            <X width={20} height={20} />
          ) : (
            <MenuBar width={25} height={25} />
          )}
        </button>
      </nav>
    </header>
  )
}
