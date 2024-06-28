import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLogin, setLogin] = useState<boolean>(false);

  useEffect(() => {
    setLogin(window.location.pathname === "/login");
  }, []);

  
  const handleSubmit = async () => {
    if (!email) {
      notifyWarning("Email cannot be empty!")
    } else if (!password) {
      notifyWarning("Password cannot be empty!")
    } else {
      dispatch(setLoading(true))
      await signIn({ email, password })
        .then((res) => {
          if (res.success && res.result.token) {
            const userData = {
              ...res.result
            }
            dispatch(setUserData(userData))
            Cookies.set(constant.ACCESS_TOKEN, res.result.token)
            Cookies.set(constant.REFRESH_TOKEN, res.result.token)
            Cookies.set(constant.USER_DATA, JSON.stringify(userData))
            localStorage.setItem(constant.USER_DATA, JSON.stringify(userData))
            if (res.result.isFirstTimeSignIn) {
              navigate("/on-boarding-questions")
            } else {
              navigate("/security")
            }
          } else if (res.status === 0) {
            notifyWarning("Invalid user credentials")
          } else {
            notifyError(
              "Connection refused: Unable to connect to the server. Please check your internet connection or try again later."
            )
          }
        })
        .finally(() => {
          dispatch(setLoading(false))
        })
    }
  }

  return (
    <div className="bg-gray-200 w-full h-screen flex flex-col items-center justify-center text-center">
      {isLogin ? "login" : "reg"}
      <div
        className={`flex bg-white rounded-2xl shadow-2xl w-2/3 max-w-4xl ${
          isLogin ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="w-3/5 p-5">left</div>
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
  );
}
