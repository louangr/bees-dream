import * as React from 'react'
import Stack from '@mui/material/Stack'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'

export interface State extends SnackbarOrigin {
    open: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

interface MessageAlertProps {
    isOpen: boolean
    onClose: () => void
    message: string
    isClosable?: boolean
    isAutoHidden?: boolean
    type: AlertColor // error, warning, success, info
}

const MessageAlert: React.FC<MessageAlertProps> = ({ isOpen, onClose, message, isClosable = true, isAutoHidden = true, type }) => {

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isOpen}
                autoHideDuration={6000}
                onClose={isAutoHidden ? onClose : undefined}
            >
                <Alert onClose={isClosable ? onClose : undefined} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack >
    )
}

export default MessageAlert