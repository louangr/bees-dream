import * as React from 'react'
import "../bufferprocess"
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton'
import { Monodose } from '../api/models/Monodose'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { fr } from 'date-fns/locale';
import QRCode from 'qrcode.react';
import { User } from "../api/models/User"
import { Document, Page, Image, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { MonodoseApiClient, UserApiClient } from '../api/main'
import moment from 'moment'
import { UserContext } from '../context/UserContext'

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
const users: User[] = [{
  informations: {
    company: "entreprise00",
    firstname: "firstname0",
    lastname: "lastname0"
  },
  login: "lastname0@email.com",
  password: "le password0",
  role: 'beeKeeper',
},
{
  informations: {
    company: "entreprise1",
    firstname: "firstname1",
    lastname: "lastname1"
  },
  login: "lastname1@email.com",
  password: "le password1",
  role: 'beeKeeper',
},
{
  informations: {
    company: "entreprise2",
    firstname: "firstname2",
    lastname: "lastname2"
  },
  login: "lastname1@email.com",
  password: "le password2",
  role: 'admin',
},
]


const MonodoseModal: React.FC<MonodoseModalProps> = ({ mode, monodose, isModalOpen, handleClose }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [location, setLocation] = React.useState<string>('')
  const [honeyVariety, setHoneyVariety] = React.useState<string>('')
  const [productionStartDate, setProductionStartDate] = React.useState<Date | null | undefined>(null)
  const [productionEndDate, setProductionEndDate] = React.useState<Date | null | undefined>(null)
  const [dluoDate, setDluoDate] = React.useState<Date | null | undefined>(null)
  // const [role, setRole] = React.useState<Role>(Role.BeeKeeper)
  const [qrvalue, setQrvalue] = React.useState<string | undefined>(undefined)
  const [documentPdfValue, setDocumentPdfValue] = React.useState<any>(null);
  const [beekeepers, setBeekeepers] = React.useState<User[]>([])
  const [beekeeperSelected, setBeekeeperSelected] = React.useState<string>('');

  const { loggedUser } = React.useContext(UserContext)


  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
    },

    section: {
      flexGrow: 1,
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

        {
          Array(250).fill(1).map(() => (
            <Image style={styles.imageEnfant}
              source={() => qr_urlImg("QRCodeEnfant")} />
          ))
        }
        <Image style={styles.imageParent}
          source={() => qr_urlImg("QRCodeParent")} />
      </View>
    </Page>
  </Document>);

  React.useEffect(() => {
    UserApiClient.getAllUsers({
      headers: new Headers([
        ['Token', loggedUser?.token || '']
      ])
    }).then((value) => {
      const beekeepers = value;
      console.log(beekeepers);
      setBeekeepers(beekeepers);
    }

    );





    //get beekeepers

  }, [])

  React.useEffect(() => {
    if (qrvalue != undefined) {

      setDocumentPdfValue(DocPDF())

    }
  }, [qrvalue])

  React.useEffect(() => {
    if (documentPdfValue != null) {

      download_qr("BtnPDF");
    }

  }, [documentPdfValue])

  const onSubmitButton = () => {

    var user;
    for (var i = 0; i < beekeepers.length; i++) {
      if (beekeepers[i].id?.toString() == beekeeperSelected) {
        user = beekeepers[i]
      }
    }

    /*UserApiClient.getUserById({
      id: beekeeperSelected,
    }, {
      headers: new Headers([
        ['Token', loggedUser?.token || '']
      ])
    }).then((value) => {*/
    // const user = value;
    const beekeeper = {
      age: 50,
      company: user?.informations?.company,
      firstname: user?.informations?.firstname,
      lastname: user?.informations?.lastname,
    }
    const newMonodose: Monodose = {
      id: monodose?.id || -1,
      beekeeper: monodose?.beekeeper || beekeeper,
      dates: {
        dluo: moment(dluoDate).format('DD/MM/YYYY') || '',
        startOfProduction: moment(productionStartDate).format('DD/MM/YYYY') || '',
        endOfProduction: moment(productionEndDate).format('DD/MM/YYYY') || ''
      },
      location: location,
      honeyVariety: honeyVariety

    }
    if (mode === MonodoseModalMode.Edition) {
      (async () => {
        setIsLoading(true)
        const updateMonodose = await MonodoseApiClient.updateMonodose({ monodose: newMonodose }, {
          headers: new Headers([
            ['Token', loggedUser?.token || '']
          ])
        });
      })()

      // TODO: PUT to API to add monodose

      setIsLoading(false)
    } else if (mode === MonodoseModalMode.Creation) {

      (async () => {
        setIsLoading(true)

        const addMonodose = await MonodoseApiClient.addMonodose({ monodose: newMonodose }, {
          headers: new Headers([
            ['Token', loggedUser?.token || '']
          ])
        });

        //setQrvalue('21')
        setQrvalue(addMonodose.id?.toString())
        console.log(addMonodose)

        setIsLoading(false)

      })()
      // TODO: POST to API to add monodose
    }

    // TODO: according to the result API, close the modal or display error message
    handleClose()
    //});



  }

  const qr_urlImg = (idQr: string) => {
    var canvas = document.getElementById(idQr) as HTMLCanvasElement;
    return canvas.toDataURL("image/png");
  }


  const download_qr = (idQr: string) => {

    var btn = document.getElementById(idQr) as HTMLButtonElement;
    if (btn != null) {

      btn.click();
    }

  }

  const deleteMonodose = (idMonodose: string) => {
    (async () => {
      const deleteMonodose = await MonodoseApiClient.deleteMonodoseById({
        id: idMonodose
      }, {
        headers: new Headers([
          ['Token', loggedUser?.token || '']
        ])
      });
    })()

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
          <div>
            <IconButton

              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <QrCode2Icon />
            </IconButton>
            <IconButton
              onClick={() => { deleteMonodose(monodose!.id!.toString()) }}
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <DeleteIcon />
            </IconButton>
          </div>

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
                value={beekeeperSelected} // TODO beekeeper id if in edit mode
                label='Apiculteur'
                //onChange={(event: SelectChangeEvent) => setRole(event.target.value as Role)}
                onChange={(event: SelectChangeEvent) => setBeekeeperSelected(event.target.value as string)}
              >
                {
                  beekeepers?.filter(beekeepers => beekeepers.role == "apiculteur").map((beekeeper: User) => (

                    <MenuItem style={{ color: '#00000099' }} value={beekeeper.id}>{beekeeper.informations?.firstname + " " + beekeeper.informations?.lastname}</MenuItem>


                  ))
                }
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
          {qrvalue != undefined && <div>  <QRCode
            id="QRCodeParent"
            size={50}
            value={"http://localhost:3000/form?id=" + qrvalue}
          />
            <QRCode
              id="QRCodeEnfant"
              size={50}
              value={"http://localhost:3000?id=" + qrvalue}
            />
          </div>}

          <PDFDownloadLink document={documentPdfValue} fileName={"qrcodes" + qrvalue + ".pdf"}>
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
    </Dialog >
  )
}

export default MonodoseModal