import React from "react"
import { Routes, Route } from "react-router-dom"
import { AppRoutes } from "./routes/routes"
import MonodosePage from "./pages/MonodosePage"
import AdminPage from "./pages/AdminPage"
import FormPage from "./pages/FormPage"
// import { UserContext } from "./context/UserContext";
// import { User } from "./models/User";
// import Login from "./components/login/Login";

const App: React.FC = () => {
  // const [user, setUser] = React.useState<User | undefined>(undefined)
  // const value = React.useMemo(() => ({ user, setUser }), [user, setUser])

  const checkAuthentification = (component: JSX.Element): JSX.Element => component

  return (
        <Routes>
          <Route path={AppRoutes.Default} element={<MonodosePage />} />
          <Route path={AppRoutes.Admin} element={checkAuthentification(<AdminPage />)} />
          <Route path={AppRoutes.Form} element={checkAuthentification(<FormPage />)} />
        </Routes>
  )
}

export default App
