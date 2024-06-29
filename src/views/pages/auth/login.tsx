import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent } from "react"
import constant from "../../../configs/constant"
import { MessageType, notifyMessage } from "../../../utility/commonFunc"
import LoadingContext from "../../../context/loading-context"
import { login } from "../../../services/auth"

const handleImageChange = (
  event: ChangeEvent<HTMLInputElement>,
  setSelectedImage: any
) => {
  const file = event.target.files?.[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const result = e.target?.result
      if (result && typeof result === "string") {
        setSelectedImage(result)
      }
    }
    reader.readAsDataURL(file)
  }
}

export default function Login() {
  const [selectedImage, setSelectedImage] = useState<string>("")

  const [, setLoading] = useContext(LoadingContext)

  const [isHide, setIsHide] = useState(true)
  const [isLogin, setLogin] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate()

  useEffect(() => {
    setLogin(window.location.pathname === "/login")
  }, [])

  const handleSubmit = async () => {
    console.log("test")
    if (!username) {
      notifyMessage(MessageType.Warning, "Email cannot be empty!")
    } else if (!password) {
      notifyMessage(MessageType.Warning, "Password cannot be empty!")
    } else {
      setLoading(true)
      await login({ username, password })
        .then((res) => {
          if (res.success && res.result.token) {
            const userData: {} = {
              ...res.result
            }
            localStorage.setItem(constant.ACCESS_TOKEN, res.result.token)
            localStorage.setItem(constant.USER_DETAIL, JSON.stringify(userData))
            localStorage.setItemItem(
              constant.USER_DETAIL,
              JSON.stringify(userData)
            )
            navigate("/")
          } else if (res.status === 0) {
            notifyMessage(MessageType.Warning, "Invalid user credentials")
          } else {
            notifyMessage(
              MessageType.Error,
              "Connection refused: Unable to connect to the server. Please check your internet connection or try again later."
            )
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <div className="bg-gray-200 w-full h-screen flex flex-col items-center justify-center text-center">
      {/*{isLogin ? "login" : "reg"}*/}
      <div
        className={`flex bg-white rounded-2xl shadow-2xl w-2/3 max-w-4xl ${
          isLogin ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="w-3/5 p-5">
          {isLogin ? (
            <h1 className="text-center text-black mt-20 text-4xl mb-4">
              Login
            </h1>
          ) : (
            <h1 className="text-center text-black mt-10 text-4xl mb-4">
              Register
            </h1>
          )}
          {isLogin ? (
            <form className="max-w-xs mx-auto mt-10">
              <input
                type="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type={isHide ? "password" : "text"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex gap-5">
                <input
                  className="w-10"
                  type="checkbox"
                  checked={!isHide}
                  onChange={() => setIsHide(!isHide)}
                />
                <label>Show password</label>
              </div>
              <button
                type="button"
                className="bg-black h-10 mt-5 text-white hover:bg-primary-400"
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>
          ) : (
            <form className="block max-w-xs mx-auto">
              {selectedImage && (
                <div className="flex items-center justify-center m-4">
                  <img
                    src={selectedImage}
                    alt="Selected image"
                    className="rounded-full w-64 h-64 object-cover"
                  />
                </div>
              )}
              <input type="text" placeholder="Enter your first name" />
              <input type="text" placeholder="Enter your last name" />
              <input type="username" placeholder="Enter your username" />
              <input type="username" placeholder="Enter your phone number" />
              <input type="password" placeholder="Enter your password" />
              <input
                type="file"
                accept="image/*"
                onChange={() => handleImageChange(e, setSelectedImage)}
              />
              <button
                type="button"
                className="bg-black h-10 text-center text-white hover:bg-gray-800"
              >
                Register
              </button>
            </form>
          )}
        </div>

        <div
          className={`w-2/5 bg-black text-white py-36 px-12 ${
            isLogin
              ? "rounded-tr-2xl rounded-br-2xl"
              : "rounded-tl-2xl rounded-bl-2xl"
          }`}
        >
          <h2 className="text-3xl font-bold mb-2 whitespace-nowrap">
            Hello, watchers
          </h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-10">
            Create account using personal information and start journey with us
          </p>
          {isLogin ? (
            <Link
              to={"/register"}
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold 
            hover:bg-white hover:text-primary-600"
            >
              Register
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold 
            hover:bg-white hover:text-primary-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
