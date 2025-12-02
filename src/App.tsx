import { Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import UnloggedOnlyRoute from "./auth/components/UnloggedOnlyRoute"
import PrivateRoute from "./auth/components/PrivateRoute"
import PublicNavbar from "./layout/PublicNavbar"
import PrivateNavbar from "./layout/PrivateNavbar"

export default function App (){
  return <Routes>
    <Route
      path="/auth"
      element={<UnloggedOnlyRoute />}  
    >
      <Route element={<PublicNavbar />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Route>

    <Route path="/" element={<PrivateRoute />}>
      <Route element={<PrivateNavbar />}>
        <Route index element={<HomePage />}/>
      </Route>
    </Route>
  </Routes>
}