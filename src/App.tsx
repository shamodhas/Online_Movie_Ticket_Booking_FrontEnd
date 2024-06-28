import "./App.css"
import { useState } from "react"
import { User, UserRoles } from "./types/user"
import UserContext from "./context/user-context"
import Router from "./router/Router"
import LoadingContext from "./context/loading-context"
import Loader from "./components/Loader"
import { Toaster } from "react-hot-toast"

function App(): JSX.Element {
  const [user, setUser] = useState<User>({ role: UserRoles.THEATER_EMPLOYEE })
  const [loading, setLoading] = useState(false)

  return (
    <UserContext.Provider value={[user, setUser]}>
      <LoadingContext.Provider value={[loading, setLoading]}>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
          <Loader />
          <Router />
        </div>
      </LoadingContext.Provider>
    </UserContext.Provider>
  )
}

export default App
