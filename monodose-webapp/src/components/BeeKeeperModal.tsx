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
              sx={{ mr: 2 }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here.
          We will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={isLoading} onClick={onSubmitButton}>{mode === BeeKeeperModalMode.Edition ? 'Modifier' : 'Ajouter'}</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default BeeKeeperModal