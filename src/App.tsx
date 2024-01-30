import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import PageLayout from "./components/layout/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Movies from "./pages/movies";
import Theaters from "./pages/theaters";
import Login from "./pages/login";
import Register from "./pages/register";
import { useState } from "react";
import { User, UserRoles } from "./util/user";
import UserContext from "./context/user-context";
import MovieEditor from "./pages/movies/movie-editor";
import MyMovies from "./pages/movies/my-movies";

function App(): JSX.Element {
  const [user, setUser] = useState<User>({ role: UserRoles.GUEST });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PageLayout>
              <Outlet />
            </PageLayout>
          }
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="movies" element={<Movies />} />
          <Route path="theaters" element={<Theaters />} />
          <Route path="movie-editor" element={<MovieEditor />} />
          <Route path="my-movies" element={<MyMovies />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
