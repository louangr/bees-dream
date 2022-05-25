import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import React from "react"
import BeeKeeperList from "../components/BeeKeeperList"
import CustomAppBar from "../components/CustomAppBar"
import { UserContext } from "../context/UserContext"

const AdminPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState<string>('1')
  const { user } = React.useContext(UserContext)

  return (
    <>
      <CustomAppBar />

      {user?.role === 'admin'
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
            <TabPanel value="2">Item Two</TabPanel>
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