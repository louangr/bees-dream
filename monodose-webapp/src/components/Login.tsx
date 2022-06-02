import React from "react"
import { AlertColor, TextField } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import SharedStyle from "../shared/styles"
import { JSEncrypt } from "jsencrypt";
import { LoginApiClient } from "../api/main"
import { Logged } from "../api/models/Logged"
import MessageAlert from "./MessageAlert";

interface LoginProps {
  onLogin: (loggedUser: Logged) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState<string | undefined>(undefined)
  const [hasEmailError, setHasEmailError] = React.useState<boolean>(false)
  const [password, setPassword] = React.useState<string | undefined>(undefined)
  const [hasPasswordError, setHasPasswordError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [alertType, setAlertType] = React.useState<AlertColor>('error')
  const [alertMessage, setAlertMessage] = React.useState<string>('')
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false)

  const encryptPassword = (password: string): string => {
    // Start our encryptor.
    var encrypt = new JSEncrypt();

    var publicKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuohFphBkVlhWg8/NlOeb
    InofzFd32NIYFOcVDfyjW+tEkc2S/lH3nn3uHHNUMR3zeWzESXyDrbBXaZLeWsT1
    KxGJFWiNnvgXS9/SGDWFUnYVo14MhyFwvcNbKpAgwztndoaMZY5GHzumuowCgraY
    666ZHG8V+mGV+nUDROTeAwMjhzZ7C5CEwp3H6XcjuvhJXiyjcDUzNZdD0VaKcASn
    uexjG9Y2MT+iNqY//jTMvqArAnvfU9F7JqqigTS9dpoH8OYAPEdwH/VmRv88kVb1
    aLPCAWZTY2nSmwJGZvfflJm/cAxjG55q1UTreKNUaH2L8k8XOjomGBjbKzT3bCPh
    1QIDAQAB
    -----END PUBLIC KEY-----`;

    // Assign our encryptor to utilize the public key.
    encrypt.setPublicKey(publicKey);

    // Perform our encryption based on our public key - only private key can read it!
    var encrypted = encrypt.encrypt(password);
    return encrypted + "";
  }
  const onSubmitButtonClick = () => {
    const hasEmail = email && email.trim() !== ""
    const hasPassword = password && password.trim() !== ""

    setHasEmailError(!hasEmail)
    setHasPasswordError(!hasPassword)

    if (hasEmail && hasPassword) {
      setIsLoading(true)

      LoginApiClient.login({ login: { login: email, password: encryptPassword(password) } })
        .then((result) => {
          onLogin(result)
        }).catch(e => {
          setIsAlertOpen(true)
          setAlertType('error')
          setAlertMessage('Erreur : Identifiant ou mot de passe incorrect')
        })

      setIsLoading(false)

    }
  }

  return (
    <>
      <MessageAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        message={alertMessage}
        type={alertType}
      />
      <div style={SharedStyle.container}>
        <div style={SharedStyle.formContainer}>
          <TextField
            required
            error={hasEmailError}
            id="outlined-required"
            label={hasEmailError ? "Email requis" : "Email"}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            required
            error={hasPasswordError}
            id="outlined-password-input"
            label={hasPasswordError ? "Mot de passe requis" : "Mot de passe"}
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
    </>
  )
}

export default Login
