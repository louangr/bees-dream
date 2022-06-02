import * as React from "react";
import "../bufferprocess";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { AlertColor } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LoadingButton from "@mui/lab/LoadingButton";
import { Monodose } from "../api/models/Monodose";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { fr } from "date-fns/locale";
import { User } from "../api/models/User";
import { MonodoseApiClient, UserApiClient } from "../api/main";
import moment from "moment";
import MessageAlert from "./MessageAlert";
import { UserContext } from "../context/UserContext";

export enum MonodoseModalMode {
  Edition,
  Creation,
}

interface MonodoseModalProps {
  mode: MonodoseModalMode;
  monodose?: Monodose;
  isModalOpen: boolean;
  handleClose: (monodoseID: number) => void;
}
const users: User[] = [
  {
    informations: {
      company: "entreprise00",
      firstname: "firstname0",
      lastname: "lastname0",
    },
    login: "lastname0@email.com",
    password: "le password0",
    role: "beeKeeper",
  },
  {
    informations: {
      company: "entreprise1",
      firstname: "firstname1",
      lastname: "lastname1",
    },
    login: "lastname1@email.com",
    password: "le password1",
    role: "beeKeeper",
  },
  {
    informations: {
      company: "entreprise2",
      firstname: "firstname2",
      lastname: "lastname2",
    },
    login: "lastname1@email.com",
    password: "le password2",
    role: "admin",
  },
];

const MonodoseModal: React.FC<MonodoseModalProps> = ({
  mode,
  monodose,
  isModalOpen,
  handleClose,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<string>("");
  const [honeyVariety, setHoneyVariety] = React.useState<string>("");
  const [productionStartDate, setProductionStartDate] = React.useState<
    Date | null | undefined
  >(null);
  const [productionEndDate, setProductionEndDate] = React.useState<
    Date | null | undefined
  >(null);
  const [dluoDate, setDluoDate] = React.useState<Date | null | undefined>(null);
  // const [role, setRole] = React.useState<Role>(Role.BeeKeeper)
  const [beekeepers, setBeekeepers] = React.useState<User[]>([]);
  const [beekeeperSelected, setBeekeeperSelected] = React.useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const [isAlertClosable, setIsAlertClosable] = React.useState<boolean>(false);
  const [isAlertAutoHidden, setIsAlertAutoHidden] =
    React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<AlertColor>("error");
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const { loggedUser } = React.useContext(UserContext);

  React.useEffect(() => {
    UserApiClient.getAllUsers({
      headers: new Headers([["Token", loggedUser?.token || ""]]),
    }).then((value) => {
      const beekeepers = value;
      setBeekeepers(beekeepers);
    });
    //get beekeepers
  }, []);

  const onSubmitButton = () => {
    var user;
    for (var i = 0; i < beekeepers.length; i++) {
      if (beekeepers[i].id?.toString() == beekeeperSelected) {
        user = beekeepers[i];
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
    };
    const newMonodose: Monodose = {
      id: monodose?.id || -1,
      beekeeper: monodose?.beekeeper || beekeeper,
      dates: {
        dluo: moment(dluoDate).format("DD/MM/YYYY") || "",
        startOfProduction:
          moment(productionStartDate).format("DD/MM/YYYY") || "",
        endOfProduction: moment(productionEndDate).format("DD/MM/YYYY") || "",
      },
      location: location,
      honeyVariety: honeyVariety,
    };

    if (mode === MonodoseModalMode.Edition) {
      (async () => {
        setIsLoading(true);
        const updateMonodose = await MonodoseApiClient.updateMonodose(
          { monodose: newMonodose },
          {
            headers: new Headers([["Token", loggedUser?.token || ""]]),
          }
        );
      })();

      // TODO: PUT to API to add monodose

      setIsLoading(false);
      handleClose(0);
    } else if (mode === MonodoseModalMode.Creation) {
      (async () => {
        setIsLoading(true);

        const addMonodose = await MonodoseApiClient.addMonodose(
          { monodose: newMonodose },
          {
            headers: new Headers([["Token", loggedUser?.token || ""]]),
          }
        );
        setIsLoading(false);
        const monodoseID = addMonodose.id;
        if (monodoseID !== undefined) {
          handleClose(monodoseID);
        } else {
          handleClose(0);
        }
      })();
      // TODO: POST to API to add monodose
    }
  };

  const deleteMonodose = (idMonodose: string) => {
    (async () => {
      const deleteMonodose = await MonodoseApiClient.deleteMonodoseById(
        {
          id: idMonodose,
        },
        {
          headers: new Headers([["Token", loggedUser?.token || ""]]),
        }
      )
        .then(() => {
          setIsAlertOpen(true);
          setIsAlertAutoHidden(true);
          setIsAlertClosable(true);
          setAlertType("success");
          setAlertMessage("Mise à jour effectuée");
          setIsDisabled(productionEndDate ? true : false);
        })
        .catch(() => {
          setIsAlertOpen(true);
          setIsAlertAutoHidden(false);
          setIsAlertClosable(true);
          setAlertType("error");
          setAlertMessage("Erreur : Serveur injoignable");
        });
    })();
  };

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
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ margin: 0, padding: 0 }}>
            {mode === MonodoseModalMode.Edition
              ? `Monodose ${monodose?.id}`
              : "Nouvelle monodose"}
          </p>
          {mode === MonodoseModalMode.Edition && (
            <div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <QrCode2Icon />
              </IconButton>
              <IconButton
                onClick={() => {
                  deleteMonodose(monodose!.id!.toString());
                }}
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
        <DialogContent style={{ paddingBottom: 0 }}>
          <div style={{ display: "flex", flexDirection: "row", padding: 20 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 16,
              }}
            >
              <TextField
                label="Localisation"
                margin="normal"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
              <TextField
                label="Variété du miel"
                margin="normal"
                value={honeyVariety}
                onChange={(event) => setHoneyVariety(event.target.value)}
              />
              <FormControl margin="normal">
                <InputLabel id="simple-select" color="primary">
                  Apiculteur
                </InputLabel>
                <Select
                  value={beekeeperSelected} // TODO beekeeper id if in edit mode
                  label="Apiculteur"
                  //onChange={(event: SelectChangeEvent) => setRole(event.target.value as Role)}
                  onChange={(event: SelectChangeEvent) =>
                    setBeekeeperSelected(event.target.value as string)
                  }
                >
                  {beekeepers
                    ?.filter((beekeepers) => beekeepers.role == "apiculteur")
                    .map((beekeeper: User) => (
                      <MenuItem
                        style={{ color: "#00000099" }}
                        value={beekeeper.id}
                      >
                        {beekeeper.informations?.firstname +
                          " " +
                          beekeeper.informations?.lastname}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ borderRightWidth: 2, borderRadius: 10 }}
              flexItem
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 16,
              }}
            >
              <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
                <DatePicker
                  showDaysOutsideCurrentMonth
                  clearable
                  clearText="Effacer"
                  cancelText="Annuler"
                  label="Date début de production"
                  inputFormat="dd/MM/yyyy"
                  value={productionStartDate}
                  onChange={(newProductionStartDate) => {
                    setProductionStartDate(newProductionStartDate);
                  }}
                  PopperProps={{
                    placement: "auto-end",
                  }}
                  renderInput={(params) => (
                    <TextField margin="normal" {...params} />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
                <DatePicker
                  showDaysOutsideCurrentMonth
                  clearable
                  clearText="Effacer"
                  cancelText="Annuler"
                  label="Date fin de production"
                  inputFormat="dd/MM/yyyy"
                  value={productionEndDate}
                  onChange={(newProductionEndDate) => {
                    setProductionEndDate(newProductionEndDate);
                    setDluoDate(
                      newProductionEndDate
                        ? new Date(
                            new Date(newProductionEndDate).setMonth(
                              new Date(newProductionEndDate).getMonth() + 18
                            )
                          )
                        : null
                    );
                  }}
                  PopperProps={{
                    placement: "auto-end",
                  }}
                  renderInput={(params) => (
                    <TextField margin="normal" {...params} />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
                <DatePicker
                  disabled
                  label="Date DLUO"
                  inputFormat="dd/MM/yyyy"
                  value={dluoDate}
                  onChange={setDluoDate}
                  renderInput={(params) => (
                    <TextField margin="normal" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            style={{ marginRight: 9, marginBottom: 9 }}
            loading={isLoading}
            onClick={onSubmitButton}
          >
            {mode === MonodoseModalMode.Edition ? "Modifier" : "Ajouter"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MonodoseModal;
