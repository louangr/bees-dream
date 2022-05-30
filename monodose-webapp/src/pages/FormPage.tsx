import * as React from 'react'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { fr } from 'date-fns/locale'
import SharedStyle from '../shared/styles'
import { Monodose } from '../models/Monodose'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'

const FormPage: React.FC = () => {

  const [monodose, setMonodose] = React.useState<Monodose | null>(null)
  const [location, setLocation] = React.useState<string | undefined>('')
  const [productionStartDate, setProductionStartDate] = React.useState<Date | null | undefined>(null)
  const [productionEndDate, setProductionEndDate] = React.useState<Date | null | undefined>(null)
  const [dluoDate, setDluoDate] = React.useState<Date | null | undefined>(null)
  const [honeyVariety, setHoneyVariety] = React.useState<string | undefined>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onSubmitButtonClick = () => {

    setIsLoading(true)

    // TODO : put monodose API
    console.log(monodose)

    setIsLoading(false)

  }

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')

    fetch(`http://167.99.83.46:8080/monodose/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setMonodose(result)
      });

  }, [])

  React.useEffect(() => {
    let startdate = monodose?.dates.startofproduction || ''
    let enddate = monodose?.dates.endofproduction || ''
    let dluodate = monodose?.dates.dluo || ''
    setProductionStartDate((startdate) !== '' ? (new Date(startdate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))) : null)
    setProductionEndDate((enddate) !== '' ? (new Date(enddate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))) : null)
    setDluoDate((dluodate) !== '' ? (new Date(dluodate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))) : null)
    setLocation(monodose?.location)
    setHoneyVariety(monodose?.honeyvariety)
  }, [monodose])

  return (

    monodose
      ? (

        <div style={SharedStyle.container}>
          <div style={SharedStyle.formContainer}>

            <TextField
              margin='normal'
              fullWidth
              label='Localisation'
              value={location || ''}
              onChange={(event) => setLocation(event.target.value)}
            />

            <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
              <DatePicker
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
              margin='normal'
              fullWidth
              label='Variété du miel'
              value={honeyVariety || ''}
              onChange={(event) => setHoneyVariety(event.target.value)}
            />

            <LoadingButton
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

      ) : (
        <>
          Aucune monodose trouvée
        </>
      )

  )
}

export default FormPage
