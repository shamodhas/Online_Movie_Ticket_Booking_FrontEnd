import "./App.css"
import { useState } from "react"
import { User, UserRoles } from "./types/user"
import UserContext from "./context/user-context"
import { ToastContainer } from "react-toastify"
import Router from "./router/Router"
import LoadingContext from "./context/loading-context"
import Loader from "./components/Loader"

function App(): JSX.Element {
  const [user, setUser] = useState<User>({ role: UserRoles.THEATER_EMPLOYEE })
  const [loading, setLoading] = useState(false)

  return (
    <UserContext.Provider value={[user, setUser]}>
      <LoadingContext.Provider value={[loading, setLoading]}>
        <div>
          <Loader />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <Router />
        </div>
      </LoadingContext.Provider>
    </UserContext.Provider>
  )
}

export default App
