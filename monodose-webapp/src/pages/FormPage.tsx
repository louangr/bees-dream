import * as React from 'react'
import { Button, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { fr } from 'date-fns/locale'
import SharedStyle from '../shared/styles'
import { Monodose } from '../models/Monodose'
import SaveIcon from '@mui/icons-material/Save'

const FormPage: React.FC = () => {

  const [monodose, setMonodose] = React.useState<Monodose | null>(null)
  const [location, setLocation] = React.useState<string | undefined>('')
  const [productionStartDate, setProductionStartDate] = React.useState<Date | null | undefined>(null)
  const [productionEndDate, setProductionEndDate] = React.useState<Date | null | undefined>(null)
  const [dluoDate, setDluoDate] = React.useState<Date | null | undefined>(null)
  const [honeyVariety, setHoneyVariety] = React.useState<string | undefined>('')

  const onSubmitButtonClick = () => {

    // TODO : put monodose API
    console.log(monodose)

  }

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')
    console.log('id: ' + id)

    // TODO : get monodose API
    const monodose: Monodose = {
      id: '1',
      beekeeper: {
        firstname: 'FirstName',
        lastname: 'LastName',
        company: 'Company'
      },
      location: 'Nantes',
      productionstartdate: new Date(),
      productionenddate: new Date(),
      dluodate: new Date(),
      honeyvariety: 'variety',
    }

    setMonodose(monodose)
    setLocation(monodose.location)
    setProductionStartDate(monodose.productionstartdate)
    setProductionEndDate(monodose.productionenddate)
    setDluoDate(monodose.dluodate)
    setHoneyVariety(monodose.honeyvariety)

  }, [])

  return (
    <div style={SharedStyle.container}>
      <div style={SharedStyle.formContainer}>

        <TextField
          margin='normal'
          fullWidth
          label='Localisation'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
          <DatePicker
            clearable
            label='Date début de production'
            inputFormat='dd/MM/yyyy'
            value={productionStartDate}
            onChange={(newProductionStartDate) => {
              setProductionStartDate(newProductionStartDate)
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
            clearable
            label='Date fin de production'
            inputFormat='dd/MM/yyyy'
            value={productionEndDate}
            onChange={(newProductionEndDate) => {
              setProductionEndDate(newProductionEndDate)
              setDluoDate(newProductionEndDate ? new Date(new Date(newProductionEndDate).setMonth(new Date(newProductionEndDate).getMonth() + 18)) : null)
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
          value={honeyVariety}
          onChange={(event) => setHoneyVariety(event.target.value)}
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          startIcon={<SaveIcon />}
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmitButtonClick}
        >
          Enregistrer
        </Button>

      </div>
    </div >
  )
}

export default FormPage
