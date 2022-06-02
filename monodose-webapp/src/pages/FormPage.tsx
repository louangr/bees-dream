import * as React from 'react'
import { AlertColor, Button, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { fr } from 'date-fns/locale'
import SharedStyle from '../shared/styles'
import { Monodose } from '../api/models/Monodose'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'
import MessageAlert from '../components/MessageAlert'
import { MonodoseApiClient } from '../api/main'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { UserContext } from '../context/UserContext'

const FormPage: React.FC = () => {

  const [monodose, setMonodose] = React.useState<Monodose | null>(null)
  const [location, setLocation] = React.useState<string>('')
  const [productionStartDate, setProductionStartDate] = React.useState<Date | null>(null)
  const [productionEndDate, setProductionEndDate] = React.useState<Date | null>(null)
  const [dluoDate, setDluoDate] = React.useState<Date | null>(null)
  const [honeyVariety, setHoneyVariety] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false)
  const [isAlertClosable, setIsAlertClosable] = React.useState<boolean>(false)
  const [isAlertAutoHidden, setIsAlertAutoHidden] = React.useState<boolean>(false)
  const [alertType, setAlertType] = React.useState<AlertColor>('error')
  const [alertMessage, setAlertMessage] = React.useState<string>('')
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState<boolean>(false)

  const { loggedUser } = React.useContext(UserContext)

  const onSubmitButtonClick = async () => {

    if (productionEndDate) {
      setIsConfirmPopupOpen(true)
    } else {
      saveMonodose()
    }

  }

  const saveMonodose = async () => {

    setIsLoading(true)

    const updatedMonodose: Monodose = {
      id: monodose?.id || 0,
      beekeeper: monodose?.beekeeper || {
        firstname: '',
        lastname: '',
        company: ''
      },
      dates: {
        dluo: dluoDate ? moment(dluoDate).format('DD/MM/YYYY') : '',
        startOfProduction: productionStartDate ? moment(productionStartDate).format('DD/MM/YYYY') : '',
        endOfProduction: productionEndDate ? moment(productionEndDate).format('DD/MM/YYYY') : ''
      },
      location: location,
      honeyVariety: honeyVariety
    }

    await MonodoseApiClient.updateMonodose({ monodose: updatedMonodose }, {
      headers: new Headers([
        ['Token', loggedUser?.token || '']
      ])
    })
      .then(() => {
        setIsAlertOpen(true)
        setIsAlertAutoHidden(true)
        setIsAlertClosable(true)
        setAlertType('success')
        setAlertMessage('Mise à jour effectuée')
        setIsDisabled(productionEndDate ? true : false)
      })
      .catch(() => {
        setIsAlertOpen(true)
        setIsAlertAutoHidden(false)
        setIsAlertClosable(true)
        setAlertType('error')
        setAlertMessage('Erreur : Serveur injoignable')
      })

    setIsLoading(false)

  }

  React.useEffect(() => {

    (async () => {
      const queryParams = new URLSearchParams(window.location.search)
      const id = queryParams.get('id')

      if (id != null) {
        const result = await MonodoseApiClient.getMonodoseById({ id: id })
        setMonodose(result)
      } else {
        setIsDisabled(true)
        setIsAlertOpen(true)
        setIsAlertAutoHidden(false)
        setIsAlertClosable(false)
        setAlertType('error')
        setAlertMessage('Erreur : Identifiant monodose manquant')
      }

    })()

  }, [])

  React.useEffect(() => {

    setIsDisabled(monodose?.dates?.endOfProduction !== '' ? true : false)

    let startdate = monodose?.dates?.startOfProduction || ''
    let enddate = monodose?.dates?.endOfProduction || ''
    let dluodate = monodose?.dates?.dluo || ''

    setProductionStartDate((startdate) !== '' ? (new Date(moment(startdate, 'DD/MM/YYYY').toDate())) : null)
    setProductionEndDate((enddate) !== '' ? (new Date(moment(enddate, 'DD/MM/YYYY').toDate())) : null)
    setDluoDate((dluodate) !== '' ? (new Date(moment(dluodate, 'DD/MM/YYYY').toDate())) : null)
    setLocation(monodose?.location || '')
    setHoneyVariety(monodose?.honeyVariety || '')
  }, [monodose])

  return (
    <>

      <MessageAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        message={alertMessage}
        isClosable={isAlertClosable}
        isAutoHidden={isAlertAutoHidden}
        type={alertType}
      />

      <Dialog
        open={isConfirmPopupOpen}
        onClose={() => setIsConfirmPopupOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Êtes-vous sûr d'enregistrer les informations ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Vous ne pourrez plus modifier les informations du formulaire après avoir saisie une date de fin de production.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmPopupOpen(false)}>
            Annuler
          </Button>
          <Button onClick={() => {
            setIsConfirmPopupOpen(false)
            saveMonodose()
          }}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <div style={SharedStyle.container}>
        <div style={SharedStyle.formContainer}>

          <TextField
            disabled={isDisabled}
            margin='normal'
            fullWidth
            label='Localisation'
            value={location || ''}
            onChange={(event) => setLocation(event.target.value)}
          />

          <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
            <DatePicker
              disabled={isDisabled}
              showDaysOutsideCurrentMonth
              clearable
              clearText='Effacer'
              cancelText='Annuler'
              label='Date début de production'
              inputFormat='dd/MM/yyyy'
              value={productionStartDate}
              onChange={(newProductionStartDate) => {
                setProductionStartDate(newProductionStartDate)
              }}
              PopperProps={{
                placement: 'auto-end'
              }}
              renderInput={(params) => (
                <TextField
                  margin='normal'
                  fullWidth
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
            <DatePicker
              disabled={isDisabled}
              showDaysOutsideCurrentMonth
              clearable
              clearText='Effacer'
              cancelText='Annuler'
              label='Date fin de production'
              inputFormat='dd/MM/yyyy'
              value={productionEndDate}
              onChange={(newProductionEndDate) => {
                setProductionEndDate(newProductionEndDate)
                setDluoDate(newProductionEndDate ? new Date(new Date(newProductionEndDate).setMonth(new Date(newProductionEndDate).getMonth() + 18)) : null)
              }}
              PopperProps={{
                placement: 'auto-end'
              }}
              renderInput={(params) => (
                <TextField
                  margin='normal'
                  fullWidth
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
            <DatePicker
              disabled
              label='Date DLUO'
              inputFormat='dd/MM/yyyy'
              value={dluoDate}
              onChange={setDluoDate}
              renderInput={(params) => (
                <TextField
                  margin='normal'
                  fullWidth
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            disabled={isDisabled}
            margin='normal'
            fullWidth
            label='Variété du miel'
            value={honeyVariety || ''}
            onChange={(event) => setHoneyVariety(event.target.value)}
          />

          <LoadingButton
            disabled={isDisabled}
            type='submit'
            fullWidth
            variant='contained'
            startIcon={<SaveIcon />}
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            onClick={onSubmitButtonClick}
          >
            Enregistrer
          </LoadingButton>

        </div>
      </div >
    </>
  )
}

export default FormPage
