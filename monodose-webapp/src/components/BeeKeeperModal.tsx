import * as React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import EditIcon from '@mui/icons-material/Edit'
import { Divider, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Role, User } from '../models/User'
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
  const [role, setRole] = React.useState<Role>(Role.BeeKeeper)

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
        <p style={{ margin: 0, padding: 0 }}>{mode === BeeKeeperModalMode.Edition ? `${beekeeper?.firstname} ${beekeeper?.lastname}` : 'Nouvel apiculteur'}</p>
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
                marginBottom: 16,
                marginTop: 16
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Age"
              onChange={(event: SelectChangeEvent) => setRole(event.target.value as Role)}
            >
              <MenuItem value={Role.Admin}>Administrateur</MenuItem>
              <MenuItem value={Role.BeeKeeper}>Apiculteur</MenuItem>
            </Select>
          </div>
          <Divider orientation="vertical" variant="middle" sx={{ borderRightWidth: 2, borderRadius: 10 }} flexItem />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
            <TextField
              required
              error={hasFirstnameError}
              id="outlined-required"
              label={hasFirstnameError ? "Email required" : "Email"}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <TextField
              required
              error={hasLastnameError}
              id="outlined-required"
              label={hasLastnameError ? "Email required" : "Email"}
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
              label={hasCompanyError ? "Email required" : "Email"}
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