import React from "react"
import { Routes, Route } from "react-router-dom"
import { AppRoutes } from "./routes/routes"
import MonodosePage from "./pages/MonodosePage"
import AdminPage from "./pages/AdminPage"
import FormPage from "./pages/FormPage"
import { User } from './api/models/User'
import Login from "./components/Login"
import { UserContext } from "./context/UserContext"
import QrPage from "./pages/QrPage"
import { Logged } from "./api/models/Logged"

const App: React.FC = () => {
  const [loggedUser, setLoggedUser] = React.useState<Logged | undefined>(undefined)
  const value = React.useMemo(() => ({ loggedUser, setLoggedUser }), [loggedUser, setLoggedUser])

  const checkAuthentification = (component: JSX.Element): JSX.Element => {
    return loggedUser?.user === undefined
      ? <Login onLogin={(newLoggedUser: Logged) => setLoggedUser(newLoggedUser)} />
      : component
  }

  return (
    <UserContext.Provider value={value}>
      <Routes>
        <Route path={AppRoutes.Default} element={<MonodosePage />} />
        <Route path={AppRoutes.Admin} element={checkAuthentification(<AdminPage />)} />
        <Route path={AppRoutes.Form} element={checkAuthentification(<FormPage />)} />
        <Route path={AppRoutes.Qrcode} element={<QrPage />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App