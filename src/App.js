import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import EditUser from "./Components/User/EditUser";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user/edit/:id" element={<EditUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

const ProtectedRoute = ({ path, element }) => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};
