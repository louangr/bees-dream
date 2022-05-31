import * as React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Role } from '../models/User'
import LoadingButton from '@mui/lab/LoadingButton'
import { Monodose } from '../models/Monodose'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { fr } from 'date-fns/locale';
import QRCode from 'qrcode.react'

export enum MonodoseModalMode {
  Edition,
  Creation
}

interface MonodoseModalProps {
  mode: MonodoseModalMode
  monodose?: Monodose
  isModalOpen: boolean
  handleClose: () => void
}

function qr_urlImg(idQr: string) {
  var canvas = document.getElementById(idQr) as HTMLCanvasElement;

  return canvas.toDataURL("image/png");
}


function download_qr(idQr: string) {
  var img = qr_urlImg(idQr);
  var link = document.createElement('a');
  link.download = idQr + ".png";
  link.href = img;
  link.click();
}

const MonodoseModal: React.FC<MonodoseModalProps> = ({ mode, monodose, isModalOpen, handleClose }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [location, setLocation] = React.useState<string | undefined>(undefined)
  const [honeyVariety, setHoneyVariety] = React.useState<string | undefined>(undefined)
  const [productionStartDate, setProductionStartDate] = React.useState<Date | null | undefined>(null)
  const [productionEndDate, setProductionEndDate] = React.useState<Date | null | undefined>(null)
  const [dluoDate, setDluoDate] = React.useState<Date | null | undefined>(null)
  const [role, setRole] = React.useState<Role>(Role.BeeKeeper)
  const [qrvalue, setQrvalue] = React.useState<string | undefined>(undefined)

  const onSubmitButton = () => {
    if (mode === MonodoseModalMode.Edition) {
      setIsLoading(true)

      // TODO: PUT to API to add monodose

      setIsLoading(false)
    } else if (mode === MonodoseModalMode.Creation) {
      setIsLoading(true)

      // TODO: POST to API to add monodose

      //setQrvalue(monodose?.id)
      setQrvalue('1') //tmp
      download_qr("QRCodeParent")
      download_qr("QRCodeEnfant")
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
        <p style={{ margin: 0, padding: 0 }}>{mode === MonodoseModalMode.Edition ? `Monodose ${monodose?.id}` : 'Nouvelle monodose'}</p>
        {mode === MonodoseModalMode.Edition && (
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
          >
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: 16 }}>
            <TextField
              label='Localisation'
              margin='normal'
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
            <TextField
              label='Variété du miel'
              margin='normal'
              value={honeyVariety}
              onChange={(event) => setHoneyVariety(event.target.value)}
            />
            <FormControl
              margin='normal'>
              <InputLabel id='simple-select' color='primary'>
                Apiculteur
              </InputLabel>
              <Select
                //value={role} // TODO beekeeper id if in edit mode
                label='Apiculteur'
                onChange={(event: SelectChangeEvent) => setRole(event.target.value as Role)}
              >
                {/* TODO : foreach beekeeper list */}
                <MenuItem style={{ color: '#00000099' }} value={1}>FirstName1 LastName1</MenuItem>
                <MenuItem style={{ color: '#00000099' }} value={2}>FirstName2 LastName2</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider orientation='vertical' variant='middle' sx={{ borderRightWidth: 2, borderRadius: 10 }} flexItem />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
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
                  setProductionStartDate(newProductionStartDate);
                }}
                PopperProps={{
                  placement: 'auto-end'
                }}
                renderInput={(params) => (
                  <TextField
                    margin='normal'
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
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

        </div>
        <div style={{ display: "none" }}>
          <QRCode
            id="QRCodeParent"
            size={50}
            value={"http://localhost:3000/form?id=" + qrvalue}
          />
          <QRCode
            id="QRCodeEnfant"
            size={50}
            value={"http://localhost:3000?id=" + qrvalue}
          />
        </div>

      </DialogContent>
      <DialogActions>
        <LoadingButton style={{ marginRight: 9, marginBottom: 9 }} loading={isLoading} onClick={onSubmitButton}>{mode === MonodoseModalMode.Edition ? 'Modifier' : 'Ajouter'}</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default MonodoseModal