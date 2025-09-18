import { lazy, Suspense, useContext } from "react"
import { Route, Routes } from "react-router-dom"
import UserContext from "../context/user-context"
import PageLoader from "../components/PageLoader"
import Layout from "../components/layout"

const Home = lazy(() => import("./../views/pages/home/home"))
const About = lazy(() => import("./../views/pages/about/about"))
const Movies = lazy(() => import("./../views/pages/movies/movies"))
const Theaters = lazy(() => import("./../views/pages/theaters/theaters"))
const Login = lazy(() => import("./../views/pages/auth/login"))
const MovieEditor = lazy(() => import("./../views/pages/movies/movie-editor"))
const MyMovies = lazy(() => import("./../views/pages/movies/my-movies"))
const MyTheaters = lazy(() => import("./../views/pages/theaters/my-theaters"))
const TheaterEditor = lazy(
  () => import("./../views/pages/theaters/theater-editor")
)
const Halls = lazy(() => import("./../views/pages/theaters/halls"))
const Error = lazy(() => import("../views/pages/Error"))

// interface DefaulRoutesProps {
//   isAuth: boolean
// }

// const DefaulRoutes: React.FC<DefaulRoutesProps> = ({ isAuth }) =>
//   isAuth ? <Navigate to="/home" /> : <Navigate to="/login" />

const AppRoutes = () => {
  const [user] = useContext(UserContext)
  // const token = localStorage.getItem(constant.ACCESS_TOKEN)

  // const isAuth = () => !!user && !!token

  const routes = [
    { path: "/", element: Home, authRoute: true },
    { path: "login", element: Login, authRoute: true, blankLayout: true },
    { path: "register", element: Login, authRoute: true, blankLayout: true },
    { path: "about", element: About, authRoute: true },
    { path: "movies", element: Movies, authRoute: true },
    { path: "theaters", element: Theaters, authRoute: true },
    { path: "movie-editor", element: MovieEditor },
    { path: "theater-editor", element: TheaterEditor },
    { path: "my-movies", element: MyMovies },
    { path: "my-theaters", element: MyTheaters },
    { path: "theater-halls", element: Halls },
    { path: "*", element: Error, blankLayout: true, authRoute: true }
  ]

  return (
    <Suspense fallback={<PageLoader />}>
      <Layout routes={routes} user={user}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </Layout>
    </Suspense>
  )
}

export default AppRoutes
