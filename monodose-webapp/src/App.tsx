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


const App: React.FC = () => {
  const [user, setUser] = React.useState<User | undefined>(undefined)
  const value = React.useMemo(() => ({ user, setUser }), [user, setUser])

  const checkAuthentification = (component: JSX.Element): JSX.Element => {
    return user === undefined
      ? <Login onLogin={(newUser: User) => setUser(newUser)} />
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