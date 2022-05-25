import * as React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { User } from '../models/User'
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
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <LoadingButton style={{ marginRight: 9, marginBottom: 9 }} loading={isLoading} onClick={onSubmitButton}>{mode === BeeKeeperModalMode.Edition ? 'Modifier' : 'Ajouter'}</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default BeeKeeperModal