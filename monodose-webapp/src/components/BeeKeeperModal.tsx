import * as React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { User } from '../api/models/User'
import LoadingButton from '@mui/lab/LoadingButton'

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
  const [email, setEmail] = React.useState<string | undefined>(undefined)
  const [hasEmailError, setHasEmailError] = React.useState<boolean>(false)
  const [password, setPassword] = React.useState<string | undefined>(undefined)
  const [hasPasswordError, setHasPasswordError] = React.useState<boolean>(false)
  const [firstname, setFirstname] = React.useState<string | undefined>(undefined)
  const [hasFirstnameError, setHasFirstnameError] = React.useState<boolean>(false)
  const [lastname, setLastname] = React.useState<string | undefined>(undefined)
  const [hasLastnameError, setHasLastnameError] = React.useState<boolean>(false)
  const [company, setCompany] = React.useState<string | undefined>(undefined)
  const [hasCompanyError, setHasCompanyError] = React.useState<boolean>(false)
  const [role, setRole] = React.useState<string>('beeKeeper')

  const onSubmitButton = () => {
    if (mode === BeeKeeperModalMode.Edition) {
      setIsLoading(true)

      // TODO: PUT to API to add beekeeper

      setIsLoading(false)
    } else if (mode === BeeKeeperModalMode.Creation) {
      setIsLoading(true)

      // TODO: POST to API to add beekeeper

      setIsLoading(false)
    }

    // TODO: according to the result API, close the modal or display error message
    handleClose()
  }

  return (
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
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: 16 }}>
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
                marginBottom: 16,
                marginTop: 16
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormControl>
              <InputLabel id="simple-select" color="primary">
                Rôle
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Rôle"
                onChange={(event: SelectChangeEvent) => setRole(event.target.value)}
              >
                <MenuItem style={{ color: '#00000099' }} value={'admin'}>Administrateur</MenuItem>
                <MenuItem style={{ color: '#00000099' }} value={'beeKeeper'}>Apiculteur</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider orientation="vertical" variant="middle" sx={{ borderRightWidth: 2, borderRadius: 10 }} flexItem />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
            <TextField
              required
              error={hasFirstnameError}
              id="outlined-required"
              label={hasFirstnameError ? "Prénom required" : "Prénom"}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <TextField
              required
              error={hasLastnameError}
              id="outlined-required"
              label={hasLastnameError ? "Nom requis" : "Nom"}
              style={{
                marginBottom: 16,
                marginTop: 16
              }}
              onChange={(event) => setLastname(event.target.value)}
            />
            <TextField
              required
              error={hasCompanyError}
              id="outlined-required"
              label={hasCompanyError ? "Entreprise requis" : "Entreprise"}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>
        </div>

      </DialogContent>
      <DialogActions>
        <LoadingButton style={{ marginRight: 9, marginBottom: 9 }} loading={isLoading} onClick={onSubmitButton}>{mode === BeeKeeperModalMode.Edition ? 'Modifier' : 'Ajouter'}</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default BeeKeeperModal