import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { User } from '../models/User'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BeeKeeperModal, { BeeKeeperModalMode } from './BeeKeeperModal'

interface Column {
  id: 'firstname' | 'lastname' | 'login' | 'company' | 'role'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'firstname', label: 'Prénom', minWidth: 170 },
  { id: 'lastname', label: 'Nom', minWidth: 170 },
  { id: 'login', label: 'Login', minWidth: 170 },
  { id: 'company', label: 'Entreprise', minWidth: 170 },
  { id: 'role', label: 'Rôle', minWidth: 170 }
]

// TODO: random data, remove them after connecting the list to API
const rows: User[] = [
  { firstname: "firstname0", lastname: "lastname0", login: "lastname0@email.com", company: "entreprise0", role: "beekeeper", password: "le password0" }, { firstname: "firstname1", lastname: "lastname1", login: "lastname1@email.com", company: "entreprise1", role: "admin", password: "le password1" }, { firstname: "firstname2", lastname: "lastname2", login: "lastname2@email.com", company: "entreprise2", role: "beekeeper", password: "le password2" }, { firstname: "firstname3", lastname: "lastname3", login: "lastname3@email.com", company: "entreprise3", role: "admin", password: "le password3" }, { firstname: "firstname4", lastname: "lastname4", login: "lastname4@email.com", company: "entreprise4", role: "beekeeper", password: "le password4" }, { firstname: "firstname5", lastname: "lastname5", login: "lastname5@email.com", company: "entreprise5", role: "admin", password: "le password5" }, { firstname: "firstname6", lastname: "lastname6", login: "lastname6@email.com", company: "entreprise6", role: "beekeeper", password: "le password6" }, { firstname: "firstname7", lastname: "lastname7", login: "lastname7@email.com", company: "entreprise7", role: "admin", password: "le password7" }, { firstname: "firstname8", lastname: "lastname8", login: "lastname8@email.com", company: "entreprise8", role: "beekeeper", password: "le password8" }, { firstname: "firstname9", lastname: "lastname9", login: "lastname9@email.com", company: "entreprise9", role: "admin", password: "le password9" }, { firstname: "firstname10", lastname: "lastname10", login: "lastname10@email.com", company: "entreprise10", role: "beekeeper", password: "le password10" }, { firstname: "firstname11", lastname: "lastname11", login: "lastname11@email.com", company: "entreprise11", role: "admin", password: "le password11" }, { firstname: "firstname12", lastname: "lastname12", login: "lastname12@email.com", company: "entreprise12", role: "beekeeper", password: "le password12" }, { firstname: "firstname13", lastname: "lastname13", login: "lastname13@email.com", company: "entreprise13", role: "admin", password: "le password13" }, { firstname: "firstname14", lastname: "lastname14", login: "lastname14@email.com", company: "entreprise14", role: "beekeeper", password: "le password14" }, { firstname: "firstname15", lastname: "lastname15", login: "lastname15@email.com", company: "entreprise15", role: "admin", password: "le password15" }, { firstname: "firstname16", lastname: "lastname16", login: "lastname16@email.com", company: "entreprise16", role: "beekeeper", password: "le password16" }, { firstname: "firstname17", lastname: "lastname17", login: "lastname17@email.com", company: "entreprise17", role: "admin", password: "le password17" }, { firstname: "firstname18", lastname: "lastname18", login: "lastname18@email.com", company: "entreprise18", role: "beekeeper", password: "le password18" }, { firstname: "firstname19", lastname: "lastname19", login: "lastname19@email.com", company: "entreprise19", role: "admin", password: "le password19" }, { firstname: "firstname20", lastname: "lastname20", login: "lastname20@email.com", company: "entreprise20", role: "beekeeper", password: "le password20" }, { firstname: "firstname21", lastname: "lastname21", login: "lastname21@email.com", company: "entreprise21", role: "admin", password: "le password21" }, { firstname: "firstname22", lastname: "lastname22", login: "lastname22@email.com", company: "entreprise22", role: "beekeeper", password: "le password22" }, { firstname: "firstname23", lastname: "lastname23", login: "lastname23@email.com", company: "entreprise23", role: "admin", password: "le password23" }, { firstname: "firstname24", lastname: "lastname24", login: "lastname24@email.com", company: "entreprise24", role: "beekeeper", password: "le password24" }, { firstname: "firstname25", lastname: "lastname25", login: "lastname25@email.com", company: "entreprise25", role: "admin", password: "le password25" }, { firstname: "firstname26", lastname: "lastname26", login: "lastname26@email.com", company: "entreprise26", role: "beekeeper", password: "le password26" }, { firstname: "firstname27", lastname: "lastname27", login: "lastname27@email.com", company: "entreprise27", role: "admin", password: "le password27" }, { firstname: "firstname28", lastname: "lastname28", login: "lastname28@email.com", company: "entreprise28", role: "beekeeper", password: "le password28" }, { firstname: "firstname29", lastname: "lastname29", login: "lastname29@email.com", company: "entreprise29", role: "admin", password: "le password29" }, { firstname: "firstname30", lastname: "lastname30", login: "lastname30@email.com", company: "entreprise30", role: "beekeeper", password: "le password30" }, { firstname: "firstname31", lastname: "lastname31", login: "lastname31@email.com", company: "entreprise31", role: "admin", password: "le password31" }, { firstname: "firstname32", lastname: "lastname32", login: "lastname32@email.com", company: "entreprise32", role: "beekeeper", password: "le password32" }, { firstname: "firstname33", lastname: "lastname33", login: "lastname33@email.com", company: "entreprise33", role: "admin", password: "le password33" }, { firstname: "firstname34", lastname: "lastname34", login: "lastname34@email.com", company: "entreprise34", role: "beekeeper", password: "le password34" }, { firstname: "firstname35", lastname: "lastname35", login: "lastname35@email.com", company: "entreprise35", role: "admin", password: "le password35" }, { firstname: "firstname36", lastname: "lastname36", login: "lastname36@email.com", company: "entreprise36", role: "beekeeper", password: "le password36" }, { firstname: "firstname37", lastname: "lastname37", login: "lastname37@email.com", company: "entreprise37", role: "admin", password: "le password37" }, { firstname: "firstname38", lastname: "lastname38", login: "lastname38@email.com", company: "entreprise38", role: "beekeeper", password: "le password38" }, { firstname: "firstname39", lastname: "lastname39", login: "lastname39@email.com", company: "entreprise39", role: "admin", password: "le password39" }, { firstname: "firstname40", lastname: "lastname40", login: "lastname40@email.com", company: "entreprise40", role: "beekeeper", password: "le password40" }, { firstname: "firstname41", lastname: "lastname41", login: "lastname41@email.com", company: "entreprise41", role: "admin", password: "le password41" }, { firstname: "firstname42", lastname: "lastname42", login: "lastname42@email.com", company: "entreprise42", role: "beekeeper", password: "le password42" }, { firstname: "firstname43", lastname: "lastname43", login: "lastname43@email.com", company: "entreprise43", role: "admin", password: "le password43" }, { firstname: "firstname44", lastname: "lastname44", login: "lastname44@email.com", company: "entreprise44", role: "beekeeper", password: "le password44" }, { firstname: "firstname45", lastname: "lastname45", login: "lastname45@email.com", company: "entreprise45", role: "admin", password: "le password45" }, { firstname: "firstname46", lastname: "lastname46", login: "lastname46@email.com", company: "entreprise46", role: "beekeeper", password: "le password46" }, { firstname: "firstname47", lastname: "lastname47", login: "lastname47@email.com", company: "entreprise47", role: "admin", password: "le password47" }, { firstname: "firstname48", lastname: "lastname48", login: "lastname48@email.com", company: "entreprise48", role: "beekeeper", password: "le password48" }, { firstname: "firstname49", lastname: "lastname49", login: "lastname49@email.com", company: "entreprise49", role: "admin", password: "le password49" }, { firstname: "firstname50", lastname: "lastname50", login: "lastname50@email.com", company: "entreprise50", role: "beekeeper", password: "le password50" }, { firstname: "firstname51", lastname: "lastname51", login: "lastname51@email.com", company: "entreprise51", role: "admin", password: "le password51" }, { firstname: "firstname52", lastname: "lastname52", login: "lastname52@email.com", company: "entreprise52", role: "beekeeper", password: "le password52" }, { firstname: "firstname53", lastname: "lastname53", login: "lastname53@email.com", company: "entreprise53", role: "admin", password: "le password53" }, { firstname: "firstname54", lastname: "lastname54", login: "lastname54@email.com", company: "entreprise54", role: "beekeeper", password: "le password54" }, { firstname: "firstname55", lastname: "lastname55", login: "lastname55@email.com", company: "entreprise55", role: "admin", password: "le password55" }, { firstname: "firstname56", lastname: "lastname56", login: "lastname56@email.com", company: "entreprise56", role: "beekeeper", password: "le password56" }, { firstname: "firstname57", lastname: "lastname57", login: "lastname57@email.com", company: "entreprise57", role: "admin", password: "le password57" }, { firstname: "firstname58", lastname: "lastname58", login: "lastname58@email.com", company: "entreprise58", role: "beekeeper", password: "le password58" }, { firstname: "firstname59", lastname: "lastname59", login: "lastname59@email.com", company: "entreprise59", role: "admin", password: "le password59" }, { firstname: "firstname60", lastname: "lastname60", login: "lastname60@email.com", company: "entreprise60", role: "beekeeper", password: "le password60" }, { firstname: "firstname61", lastname: "lastname61", login: "lastname61@email.com", company: "entreprise61", role: "admin", password: "le password61" }, { firstname: "firstname62", lastname: "lastname62", login: "lastname62@email.com", company: "entreprise62", role: "beekeeper", password: "le password62" }, { firstname: "firstname63", lastname: "lastname63", login: "lastname63@email.com", company: "entreprise63", role: "admin", password: "le password63" }, { firstname: "firstname64", lastname: "lastname64", login: "lastname64@email.com", company: "entreprise64", role: "beekeeper", password: "le password64" }, { firstname: "firstname65", lastname: "lastname65", login: "lastname65@email.com", company: "entreprise65", role: "admin", password: "le password65" }, { firstname: "firstname66", lastname: "lastname66", login: "lastname66@email.com", company: "entreprise66", role: "beekeeper", password: "le password66" }, { firstname: "firstname67", lastname: "lastname67", login: "lastname67@email.com", company: "entreprise67", role: "admin", password: "le password67" }, { firstname: "firstname68", lastname: "lastname68", login: "lastname68@email.com", company: "entreprise68", role: "beekeeper", password: "le password68" }, { firstname: "firstname69", lastname: "lastname69", login: "lastname69@email.com", company: "entreprise69", role: "admin", password: "le password69" }, { firstname: "firstname70", lastname: "lastname70", login: "lastname70@email.com", company: "entreprise70", role: "beekeeper", password: "le password70" }, { firstname: "firstname71", lastname: "lastname71", login: "lastname71@email.com", company: "entreprise71", role: "admin", password: "le password71" }, { firstname: "firstname72", lastname: "lastname72", login: "lastname72@email.com", company: "entreprise72", role: "beekeeper", password: "le password72" }, { firstname: "firstname73", lastname: "lastname73", login: "lastname73@email.com", company: "entreprise73", role: "admin", password: "le password73" }, { firstname: "firstname74", lastname: "lastname74", login: "lastname74@email.com", company: "entreprise74", role: "beekeeper", password: "le password74" }, { firstname: "firstname75", lastname: "lastname75", login: "lastname75@email.com", company: "entreprise75", role: "admin", password: "le password75" }, { firstname: "firstname76", lastname: "lastname76", login: "lastname76@email.com", company: "entreprise76", role: "beekeeper", password: "le password76" }, { firstname: "firstname77", lastname: "lastname77", login: "lastname77@email.com", company: "entreprise77", role: "admin", password: "le password77" }, { firstname: "firstname78", lastname: "lastname78", login: "lastname78@email.com", company: "entreprise78", role: "beekeeper", password: "le password78" }, { firstname: "firstname79", lastname: "lastname79", login: "lastname79@email.com", company: "entreprise79", role: "admin", password: "le password79" }, { firstname: "firstname80", lastname: "lastname80", login: "lastname80@email.com", company: "entreprise80", role: "beekeeper", password: "le password80" }, { firstname: "firstname81", lastname: "lastname81", login: "lastname81@email.com", company: "entreprise81", role: "admin", password: "le password81" }, { firstname: "firstname82", lastname: "lastname82", login: "lastname82@email.com", company: "entreprise82", role: "beekeeper", password: "le password82" }, { firstname: "firstname83", lastname: "lastname83", login: "lastname83@email.com", company: "entreprise83", role: "admin", password: "le password83" }, { firstname: "firstname84", lastname: "lastname84", login: "lastname84@email.com", company: "entreprise84", role: "beekeeper", password: "le password84" }, { firstname: "firstname85", lastname: "lastname85", login: "lastname85@email.com", company: "entreprise85", role: "admin", password: "le password85" }, { firstname: "firstname86", lastname: "lastname86", login: "lastname86@email.com", company: "entreprise86", role: "beekeeper", password: "le password86" }, { firstname: "firstname87", lastname: "lastname87", login: "lastname87@email.com", company: "entreprise87", role: "admin", password: "le password87" }, { firstname: "firstname88", lastname: "lastname88", login: "lastname88@email.com", company: "entreprise88", role: "beekeeper", password: "le password88" }, { firstname: "firstname89", lastname: "lastname89", login: "lastname89@email.com", company: "entreprise89", role: "admin", password: "le password89" }, { firstname: "firstname90", lastname: "lastname90", login: "lastname90@email.com", company: "entreprise90", role: "beekeeper", password: "le password90" }, { firstname: "firstname91", lastname: "lastname91", login: "lastname91@email.com", company: "entreprise91", role: "admin", password: "le password91" }, { firstname: "firstname92", lastname: "lastname92", login: "lastname92@email.com", company: "entreprise92", role: "beekeeper", password: "le password92" }, { firstname: "firstname93", lastname: "lastname93", login: "lastname93@email.com", company: "entreprise93", role: "admin", password: "le password93" }, { firstname: "firstname94", lastname: "lastname94", login: "lastname94@email.com", company: "entreprise94", role: "beekeeper", password: "le password94" }, { firstname: "firstname95", lastname: "lastname95", login: "lastname95@email.com", company: "entreprise95", role: "admin", password: "le password95" }, { firstname: "firstname96", lastname: "lastname96", login: "lastname96@email.com", company: "entreprise96", role: "beekeeper", password: "le password96" }, { firstname: "firstname97", lastname: "lastname97", login: "lastname97@email.com", company: "entreprise97", role: "admin", password: "le password97" }, { firstname: "firstname98", lastname: "lastname98", login: "lastname98@email.com", company: "entreprise98", role: "beekeeper", password: "le password98" }, { firstname: "firstname99", lastname: "lastname99", login: "lastname99@email.com", company: "entreprise99", role: "admin", password: "le password99" }, { firstname: "firstname100", lastname: "lastname100", login: "lastname100@email.com", company: "entreprise100", role: "beekeeper", password: "le password100" }]

const BeeKeeperList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [selectedUser, setSelectedUser] = React.useState<User>()
  const [modalMode, setModalMode] = React.useState<BeeKeeperModalMode>(BeeKeeperModalMode.Edition)

  return (
    <>
      <Paper sx={{ position: 'absolute', top: '160px', bottom: '40px', right: '40px', left: '40px', overflow: 'hidden' }}>
        <TableContainer sx={{ height: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.map((row) => (
                  <TableRow hover sx={{ '&:focus': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }} role="checkbox" tabIndex={0} key={row.login}
                    onClick={() => {
                      setSelectedUser(row)
                      setModalMode(BeeKeeperModalMode.Edition)
                      setIsModalOpen(true)
                    }}
                  >
                    {columns.map((column) => <TableCell key={column.id} align={column.align}>{row[column.id]}</TableCell>)}
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 20, right: 35, }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<AddIcon onClick={() => {
              setModalMode(BeeKeeperModalMode.Creation)
              setIsModalOpen(true)
            }}
            />
            }
            tooltipTitle='Ajouter'
          />
        </SpeedDial>
      </Paper>
      <BeeKeeperModal beekeeper={selectedUser} mode={modalMode} isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default BeeKeeperList