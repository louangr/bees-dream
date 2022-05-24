import React from "react"
import { TextField } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { User } from "../models/User"
import SharedStyle from "../shared/styles"

interface LoginProps {
  onLogin: (user: User) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState<string | undefined>(undefined)
  const [hasEmailError, setHasEmailError] = React.useState<boolean>(false)
  const [password, setPassword] = React.useState<string | undefined>(undefined)
  const [hasPasswordError, setHasPasswordError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onSubmitButtonClick = async () => {
    const hasEmail = email && email.trim() !== ""
    console.log('hasEmail', hasEmail)
    const hasPassword = password && password.trim() !== ""
    console.log('hasPassword', hasPassword)

    setHasEmailError(!hasEmail)
    setHasPasswordError(!hasPassword)

    if (hasEmail && hasPassword) {
      setIsLoading(true)

      // TODO: API call to get user from login and password
      
      onLogin({
        login: email,
        password: password,
        firstname: '',
        lastname: '',
        role: ''
      })

      setIsLoading(false)
    }
  }

  return (
    <div style={SharedStyle.container}>
      <div style={SharedStyle.formContainer}>
        <TextField
          required
          error={hasEmailError}
          id="outlined-required"
          label={hasEmailError ? "Email required" : "Email"}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          required
          error={hasPasswordError}
          id="outlined-password-input"
          label={hasPasswordError ? "Password required" : "Password"}
          type="password"
          autoComplete="current-password"
          style={{
            marginTop: 16,
            marginBottom: 16
          }}
          onChange={(event) => setPassword(event.target.value)}
        />
        <LoadingButton
          style={{ width: 125 }}
          variant="contained"
          loading={isLoading}
          onClick={onSubmitButtonClick}
        >
          Login
        </LoadingButton>
      </div>
    </div>
  )
}

export default Login
