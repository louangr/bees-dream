import * as React from 'react'
import "../bufferprocess"
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton'
import { Monodose } from '../api/models/Monodose'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { fr } from 'date-fns/locale';
import QRCode from 'qrcode.react';
import { Document, Page, Image, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

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


const MonodoseModal: React.FC<MonodoseModalProps> = ({ mode, monodose, isModalOpen, handleClose }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [location, setLocation] = React.useState<string | undefined>(undefined)
  const [honeyVariety, setHoneyVariety] = React.useState<string | undefined>(undefined)
  const [productionStartDate, setProductionStartDate] = React.useState<Date | null | undefined>(null)
  const [productionEndDate, setProductionEndDate] = React.useState<Date | null | undefined>(null)
  const [dluoDate, setDluoDate] = React.useState<Date | null | undefined>(null)
  const [qrvalue, setQrvalue] = React.useState<string>('')

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
    },

    section: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center",
    },
    imageParent: {

      marginTop: 10,
      marginBottom: 0,
      marginHorizontal: 5,
      width: 60,
      height: 60,
    },
    imageEnfant: {
      marginVertical: 15,
      marginHorizontal: 10,
      width: 50,
      height: 50,
    },
  });

  const DocPDF = () => (<Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={styles.imageParent}
          source={() => qr_urlImg("QRCodeParent")} />
        {
          Array(159).fill(1).map(() => (
            <Image style={styles.imageEnfant}
              source={() => qr_urlImg("QRCodeEnfant")} />
          ))
        }
      </View>
    </Page>
  </Document>);


  const onSubmitButton = () => {
    if (mode === MonodoseModalMode.Edition) {
      setIsLoading(true)

      // TODO: PUT to API to add monodose

      setIsLoading(false)
    } else if (mode === MonodoseModalMode.Creation) {
      setIsLoading(true)

      // TODO: POST to API to add monodose

      //setQrvalue(monodose?.id)
      //tmp

      if (qrvalue == '') {
        setQrvalue('1')
      }
      console.log(qrvalue)
      download_qr("BtnPDF")


      setIsLoading(false)
    }

    // TODO: according to the result API, close the modal or display error message
    handleClose()
  }

  const qr_urlImg = (idQr: string) => {
    var canvas = document.getElementById(idQr) as HTMLCanvasElement;

    return canvas.toDataURL("image/png");
  }


  const download_qr = (idQr: string) => {
    var btn = document.getElementById(idQr) as HTMLButtonElement;
    btn.click();
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
                //onChange={(event: SelectChangeEvent) => setRole(event.target.value as Role)}
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
          <PDFDownloadLink document={<DocPDF />} fileName="qrcodes.pdf">
            <Button
              id="BtnPDF"
            >
              Télécharger en PDF
            </Button>
          </PDFDownloadLink>

        </div>

      </DialogContent>
      <DialogActions>
        <LoadingButton style={{ marginRight: 9, marginBottom: 9 }} loading={isLoading} onClick={onSubmitButton}>{mode === MonodoseModalMode.Edition ? 'Modifier' : 'Ajouter'}</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default MonodoseModal