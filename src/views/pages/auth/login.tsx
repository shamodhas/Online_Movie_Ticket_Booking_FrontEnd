import { useContext, useEffect, useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import constant from "../../../configs/constant";
import { MessageType, notifyMessage } from "../../../utility/commonFunc";
import LoadingContext from "../../../context/loading-context";
import UserContext from "../../../context/user-context";
import { login, register } from "../../../services/auth"; // Add register function in your auth service

const handleImageChange = (
  event: ChangeEvent<HTMLInputElement>,
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const file = event.target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result && typeof result === "string") {
        setSelectedImage(result);
        setSelectedFile(file);
      }
    };
    reader.readAsDataURL(file);
  }
};

export default function Login() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [, setLoading] = useContext(LoadingContext);
  const [, setUser] = useContext(UserContext);

  const [isHide, setIsHide] = useState(true);
  const [isLogin, setLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setLogin(window.location.pathname === "/login");
  }, [location.pathname]);

  const handleSubmitLogin = async () => {
    if (!username) {
      notifyMessage(MessageType.Warning, "Email cannot be empty!");
      return;
    }
    if (!password) {
      notifyMessage(MessageType.Warning, "Password cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const res = await login({ username, password });
      if (res.success && res.data.token) {
        const userData = {
          id: res.data.userId,
          name: res.data.name,
          email: res.data.email,
          status: res.data.status,
          role: res.data.role,
        };
        setUser(userData);
        localStorage.setItem(constant.ACCESS_TOKEN, res.data.token);
        localStorage.setItem(constant.USER_DETAIL, JSON.stringify(userData));
        navigate("/");
      } else if (res.status === 0) {
        notifyMessage(MessageType.Warning, "Invalid user credentials");
      } else {
        notifyMessage(
          MessageType.Error,
          "Connection refused: Unable to connect to the server."
        );
      }
    } catch (err) {
      notifyMessage(MessageType.Error, "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRegister = async () => {
    if (!firstName || !lastName || !username || !phone || !password) {
      notifyMessage(MessageType.Warning, "All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", username);
      formData.append("phone", phone);
      formData.append("password", password);
      if (selectedFile) formData.append("profileImage", selectedFile);

      const res = await register(formData);
      if (res.success) {
        notifyMessage(MessageType.Success, "Registration successful!");
        navigate("/login");
      } else {
        notifyMessage(MessageType.Error, res.message || "Registration failed");
      }
    } catch (err) {
      notifyMessage(MessageType.Error, "Something went wrong during registration!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 w-full h-screen flex flex-col items-center justify-center text-center">
      <div
        className={`flex bg-white rounded-2xl shadow-2xl w-2/3 max-w-4xl ${
          isLogin ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="w-3/5 p-5">
          <h1 className="text-center text-black mt-10 text-4xl mb-4">
            {isLogin ? "Login" : "Register"}
          </h1>

          {isLogin ? (
            <form className="max-w-xs mx-auto mt-10">
              <input
                type="text"
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
              <div className="flex gap-5 justify-center align-center">
                <input
                  className="w-10"
                  type="checkbox"
                  checked={!isHide}
                  onChange={() => setIsHide(!isHide)}
                />
                <label className="m-0">Show password</label>
              </div>
              <button
                type="button"
                className="bg-black h-10 mt-5 p-2 text-white hover:bg-primary-400"
                onClick={handleSubmitLogin}
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
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setSelectedImage, setSelectedFile)}
              />
              <button
                type="button"
                className="bg-black h-10 text-center text-white hover:bg-gray-800 mt-5"
                onClick={handleSubmitRegister}
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
            {isLogin
              ? "Don't have an account? Create one and start your journey with us."
              : "Already have an account? Login to continue."}
          </p>
          <Link
            to={isLogin ? "/register" : "/login"}
            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-primary-600"
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}

// import { useContext, useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { ChangeEvent } from "react"
// import constant from "../../../configs/constant"
// import { MessageType, notifyMessage } from "../../../utility/commonFunc"
// import LoadingContext from "../../../context/loading-context"
// import { login } from "../../../services/auth"
// import UserContext from "../../../context/user-context"

// const handleImageChange = (
//   event: ChangeEvent<HTMLInputElement>,
//   setSelectedImage: any
// ) => {
//   const file = event.target.files?.[0]

//   if (file) {
//     const reader = new FileReader()

//     reader.onload = (e) => {
//       const result = e.target?.result
//       if (result && typeof result === "string") {
//         setSelectedImage(result)
//       }
//     }
//     reader.readAsDataURL(file)
//   }
// }

// export default function Login() {
//   const [selectedImage, setSelectedImage] = useState<string>("")

//   const [, setLoading] = useContext(LoadingContext)
//   const [user, setUser] = useContext(UserContext)

//   const [isHide, setIsHide] = useState(true)
//   const [isLogin, setLogin] = useState<boolean>(false)
//   const [username, setUsername] = useState<string>("")
//   const [password, setPassword] = useState<string>("")

//   const navigate = useNavigate()

//   useEffect(() => {
//     setLogin(window.location.pathname === "/login")
//   }, [])

//   const handleSubmit = async () => {
//     console.log("test")
//     if (!username) {
//       notifyMessage(MessageType.Warning, "Email cannot be empty!")
//     } else if (!password) {
//       notifyMessage(MessageType.Warning, "Password cannot be empty!")
//     } else {
//       setLoading(true)
//       await login({ username, password })
//         .then((res) => {
//           if (res.success && res.data.token) {
//             const userData = {
//               id: res.data.userId,
//               name: res.data.name,
//               email: res.data.email,
//               status: res.data.status,
//               role: res.data.role
//             }
//             setUser(userData)
//             localStorage.setItem(constant.ACCESS_TOKEN, res.data.token)
//             localStorage.setItem(constant.USER_DETAIL, JSON.stringify(userData))
//             localStorage.setItem(constant.USER_DETAIL, JSON.stringify(userData))
//             navigate("/")
//           } else if (res.status === 0) {
//             notifyMessage(MessageType.Warning, "Invalid user credentials")
//           } else {
//             notifyMessage(
//               MessageType.Error,
//               "Connection refused: Unable to connect to the server. Please check your internet connection or try again later."
//             )
//           }
//         })
//         .finally(() => {
//           setLoading(false)
//         })
//     }
//   }

//   return (
//     <div className="bg-gray-200 w-full h-screen flex flex-col items-center justify-center text-center">
//       {/*{isLogin ? "login" : "reg"}*/}
//       <div
//         className={`flex bg-white rounded-2xl shadow-2xl w-2/3 max-w-4xl ${
//           isLogin ? "flex-row" : "flex-row-reverse"
//         }`}
//       >
//         <div className="w-3/5 p-5">
//           {isLogin ? (
//             <h1 className="text-center text-black mt-20 text-4xl mb-4">
//               Login
//             </h1>
//           ) : (
//             <h1 className="text-center text-black mt-10 text-4xl mb-4">
//               Register
//             </h1>
//           )}
//           {isLogin ? (
//             <form className="max-w-xs mx-auto mt-10">
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <input
//                 type={isHide ? "password" : "text"}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div className="flex gap-5 justify-center align-center">
//                 <input
//                   className="w-10"
//                   type="checkbox"
//                   checked={!isHide}
//                   onChange={() => setIsHide(!isHide)}
//                 />
//                 <label className="m-0">Show password</label>
//               </div>
//               <button
//                 type="button"
//                 className="bg-black h-10 mt-5 p-2 text-white hover:bg-primary-400"
//                 onClick={handleSubmit}
//               >
//                 Login
//               </button>
//             </form>
//           ) : (
//             <form className="block max-w-xs mx-auto">
//               {selectedImage && (
//                 <div className="flex items-center justify-center m-4">
//                   <img
//                     src={selectedImage}
//                     alt="Selected image"
//                     className="rounded-full w-64 h-64 object-cover"
//                   />
//                 </div>
//               )}
//               <input type="text" placeholder="Enter your first name" />
//               <input type="text" placeholder="Enter your last name" />
//               <input type="username" placeholder="Enter your username" />
//               <input type="username" placeholder="Enter your phone number" />
//               <input type="password" placeholder="Enter your password" />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImageChange(e, setSelectedImage)}
//               />
//               <button
//                 type="button"
//                 className="bg-black h-10 text-center text-white hover:bg-gray-800"
//               >
//                 Register
//               </button>
//             </form>
//           )}
//         </div>

//         <div
//           className={`w-2/5 bg-black text-white py-36 px-12 ${
//             isLogin
//               ? "rounded-tr-2xl rounded-br-2xl"
//               : "rounded-tl-2xl rounded-bl-2xl"
//           }`}
//         >
//           <h2 className="text-3xl font-bold mb-2 whitespace-nowrap">
//             Hello, watchers
//           </h2>
//           <div className="border-2 w-10 border-white inline-block mb-2"></div>
//           <p className="mb-10">
//             Create account using personal information and start journey with us
//           </p>
//           {isLogin ? (
//             <Link
//               to={"/register"}
//               className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold 
//             hover:bg-white hover:text-primary-600"
//             >
//               Register
//             </Link>
//           ) : (
//             <Link
//               to={"/login"}
//               className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold 
//             hover:bg-white hover:text-primary-600"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
