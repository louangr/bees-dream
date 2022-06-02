import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import React from "react"
import BeeKeeperList from "../components/BeeKeeperList"
import CustomAppBar from "../components/CustomAppBar"
import MonodoseList from "../components/MonodoseList"
import { UserContext } from "../context/UserContext"
import { Role } from "../models/Role"

const AdminPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState<string>('1')
  const { loggedUser } = React.useContext(UserContext)

  return (
    <>
      <CustomAppBar />

      {loggedUser?.user?.role === Role.Admin
        ?
        <div style={{ padding: '20px 0px 0px 20px' }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(_, newValue: string) => setTabValue(newValue)} aria-label="lab API tabs example">
                <Tab label="Apiculteurs" value="1" />
                <Tab label="Monodoses" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><BeeKeeperList /></TabPanel>
            <TabPanel value="2"><MonodoseList /></TabPanel>
          </TabContext>
        </div>
        :
        <>
          Aucune données disponibles selon vos droits
        </>
      }
    </>
  )
}

export default AdminPage