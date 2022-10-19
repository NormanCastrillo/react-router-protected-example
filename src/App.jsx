import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/users/Home";
import Dashboard from "./pages/users/Dashboard";
import Analitycs from "./pages/users/Analitycs";
import Admin from "./pages/admin/Admin";
import NotFoundPage from "./pages/NotFoundPage";
import { useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
// la etiqueta index en en Route indica que se va a dirigir ahi si visitan la raiz lo equivalente a path="/"

function App() {
  const [user, setUser] = useState();

  const login = () => {
    setUser({
      id: 1,
      name: "Paulina",
      permissions:['analize'],
      roles:['admin']
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navigation />
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
      <Routes>
        <Route index element={<Landing />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route element={<ProtectedRoute isAuthenticated={!!user} redirectTo="/" />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route
          path="/analitycs"
          element={
            <ProtectedRoute isAuthenticated={!!user && user.permissions.includes('analize')}>
              <Analitycs />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/admin" element={
          <ProtectedRoute isAuthenticated={!!user && user.roles.includes('admin')}>
             <Admin />
          </ProtectedRoute>
        }></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analitycs">Analitycs</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
