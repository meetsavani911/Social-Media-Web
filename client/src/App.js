import "./App.css"
import Auth from "./page/Auth/Auth";
import Home from "./page/home/Home";
import Profile from "./page/Profile/Profile";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
      </Routes>

    </div>
  );
}

export default App;
