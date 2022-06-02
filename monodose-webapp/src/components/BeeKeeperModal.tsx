import * as React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { AlertColor, Divider, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { User } from '../api/models/User'
import LoadingButton from '@mui/lab/LoadingButton'
import { UserApiClient } from '../api/main'
import { UserContext } from '../context/UserContext'
import MessageAlert from '../components/MessageAlert'
import JSEncrypt from 'jsencrypt'

export enum BeeKeeperModalMode {
  Edition,
  Creation
}

interface BeeKeeperModalProps {
  mode: BeeKeeperModalMode
  beekeeper?: User
  isModalOpen: boolean
  handleClose: () => void
}

const BeeKeeperModal: React.FC<BeeKeeperModalProps> = ({ mode, beekeeper, isModalOpen, handleClose }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [login, setLogin] = React.useState<string | undefined>(undefined)
  const [hasLoginError, setHasLoginError] = React.useState<boolean>(false)
  const [password, setPassword] = React.useState<string | undefined>(undefined)
  const [hasPasswordError, setHasPasswordError] = React.useState<boolean>(false)
  const [firstname, setFirstname] = React.useState<string | undefined>(undefined)
  const [hasFirstnameError, setHasFirstnameError] = React.useState<boolean>(false)
  const [lastname, setLastname] = React.useState<string | undefined>(undefined)
  const [hasLastnameError, setHasLastnameError] = React.useState<boolean>(false)
  const [company, setCompany] = React.useState<string | undefined>(undefined)
  const [age, setAge] = React.useState<string>('0')
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false)
  const [alertType, setAlertType] = React.useState<AlertColor>('error')
  const [alertMessage, setAlertMessage] = React.useState<string>('')

  const { loggedUser } = React.useContext(UserContext)


  React.useEffect(() => {

    console.log(beekeeper)

    setHasLoginError(false)
    setHasPasswordError(false)
    setHasFirstnameError(false)
    setHasLastnameError(false)

    if (mode === BeeKeeperModalMode.Edition && beekeeper) {
      setLogin(beekeeper.login)
      setPassword(beekeeper.password)
      setFirstname(beekeeper.informations?.firstname)
      setLastname(beekeeper.informations?.lastname)
      setCompany(beekeeper.informations?.company)
      setAge(beekeeper.informations?.age?.toString() || '0')
    } else {
      setLogin('')
      setPassword('')
      setFirstname('')
      setLastname('')
      setCompany('')
      setAge('0')
    }

  }, [isModalOpen])


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

  const onSubmitButton = async () => {

    const hasLogin = login && login.trim() !== ""
    const hasPassword = password && password.trim() !== ""
    const hasFirstname = firstname && firstname.trim() !== ""
    const hasLastName = lastname && lastname.trim() !== ""

    setHasLoginError(!hasLogin)
    setHasPasswordError(!hasPassword)
    setHasFirstnameError(!hasFirstname)
    setHasLastnameError(!hasLastName)

    if (hasLogin && hasPassword && hasFirstname && hasLastName) {

      if (mode === BeeKeeperModalMode.Edition) {
        setIsLoading(true)

        let pwd
        if (password != beekeeper?.password) {
          pwd = encryptPassword(password)
        } else {
          pwd = beekeeper?.password
        }

        const updatedBeekeeper: User = {
          id: beekeeper?.id,
          informations: {
            firstname: firstname,
            lastname: lastname,
            company: company,
            age: parseInt(age !== undefined ? age : '0')
          },
          login: login,
          password: pwd,
          role: 'apiculteur'
        }

        await UserApiClient.updateUser({ user: updatedBeekeeper }, {
          headers: new Headers([
            ['Token', loggedUser?.token || '']
          ])
        })
          .then(() => {
            setIsAlertOpen(true)
            setAlertType('success')
            setAlertMessage('Mise à jour effectuée')
          })
          .catch(() => {
            setIsAlertOpen(true)
            setAlertType('error')
            setAlertMessage('Erreur : Serveur injoignable')
          })

        setIsLoading(false)

      } else if (mode === BeeKeeperModalMode.Creation) {
        setIsLoading(true)

        const newBeekeeper: User = {
          id: -1,
          informations: {
            firstname: firstname,
            lastname: lastname,
            company: company,
            age: parseInt(age !== undefined ? age : '0')
          },
          login: login,
          password: encryptPassword(password),
          role: 'apiculteur'
        }

        await UserApiClient.addUser({ user: newBeekeeper }, {
          headers: new Headers([
            ['Token', loggedUser?.token || '']
          ])
        })
          .then(() => {
            setIsAlertOpen(true)
            setAlertType('success')
            setAlertMessage('Apiculteur ajouté')
          })
          .catch(() => {
            setIsAlertOpen(true)
            setAlertType('error')
            setAlertMessage('Erreur : Serveur injoignable')
          })


        setIsLoading(false)
      }

      handleClose()
    }
  }


  const deleteBeekeeper = async () => {

    if (mode === BeeKeeperModalMode.Edition) {
      setIsLoading(true)

      let id = beekeeper?.id

      await UserApiClient.deleteUserById({ id: id?.toString() || '-1' }, {
        headers: new Headers([
          ['Token', loggedUser?.token || '']
        ])
      })
        .then(() => {
          setIsAlertOpen(true)
          setAlertType('success')
          setAlertMessage('Suppression effectuée')
        })
        .catch(() => {
          setIsAlertOpen(true)
          setAlertType('error')
          setAlertMessage('Erreur : Serveur injoignable')
        })

      setIsLoading(false)


    }

    handleClose()

  }


  return (
    <>
      <MessageAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        message={alertMessage}
        type={alertType}
      />

      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <p style={{ margin: 0, padding: 0 }}>{mode === BeeKeeperModalMode.Edition ? `${beekeeper?.informations?.firstname} ${beekeeper?.informations?.lastname}` : 'Nouvel apiculteur'}</p>
          {mode === BeeKeeperModalMode.Edition && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <DeleteIcon
                onClick={deleteBeekeeper} />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 16 }}>
              <TextField
                required
                value={login}
                error={hasLoginError}
                label={hasLoginError ? "Login requis" : "Login"}
                onChange={(event) => setLogin(event.target.value)}
              />
              <TextField
                required
                value={password}
                error={hasPasswordError}
                label={hasPasswordError ? "Mot de passe requis" : "Mot de passe"}
                style={{
                  marginBottom: 16,
                  marginTop: 16
                }}
                type="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                value={age}
                label="Age"
                onChange={(event) => setAge(event.target.value)}
              />
            </div>
            <Divider orientation="vertical" variant="middle" sx={{ borderRightWidth: 2, borderRadius: 10 }} flexItem />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
              <TextField
                required
                value={firstname}
                error={hasFirstnameError}
                label={hasFirstnameError ? "Prénom required" : "Prénom"}
                onChange={(event) => setFirstname(event.target.value)}
              />
              <TextField
                required
                value={lastname}
                error={hasLastnameError}
                label={hasLastnameError ? "Nom requis" : "Nom"}
                style={{
                  marginBottom: 16,
                  marginTop: 16
                }}
                onChange={(event) => setLastname(event.target.value)}
              />
              <TextField
                value={company}
                label="Entreprise"
                onChange={(event) => setCompany(event.target.value)}
              />
            </div>
          </div>

        </DialogContent>
        <DialogActions>
          <LoadingButton style={{ marginRight: 9, marginBottom: 9 }} loading={isLoading} onClick={onSubmitButton}>{mode === BeeKeeperModalMode.Edition ? 'Modifier' : 'Ajouter'}</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BeeKeeperModal