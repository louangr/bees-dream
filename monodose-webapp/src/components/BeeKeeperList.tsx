import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { User } from '../api/models/User'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BeeKeeperModal, { BeeKeeperModalMode } from './BeeKeeperModal'
import { MonodoseApiClient, UserApiClient } from '../api/main'
import { UserContext } from '../context/UserContext'
import { Role } from '../models/Role'

interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  format: (u : User) => string | undefined
}

const columns: readonly Column[] = [
  { id: 'informations.firstname', label: 'Prénom', minWidth: 170, format: (u) => u.informations?.firstname},
  { id: 'informations.lastname', label: 'Nom', minWidth: 170,  format: (u) => u.informations?.lastname },
  { id: 'login', label: 'Login', minWidth: 170, format: (u) => u.login },
  { id: 'informations.company', label: 'Entreprise', minWidth: 170,  format: (u) => u.informations?.company },
  { id: 'role', label: 'Rôle', minWidth: 170,  format: (u) => u.role }
]

const BeeKeeperList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [selectedUser, setSelectedUser] = React.useState<User>()
  const [modalMode, setModalMode] = React.useState<BeeKeeperModalMode>(BeeKeeperModalMode.Edition)
  const { loggedUser } = React.useContext(UserContext)
  const [rows,setRows] = React.useState<User[]>()

  React.useEffect(() => {
    (async () =>{
      await UserApiClient.getAllUsers({
        headers: new Headers([
          ['Token', loggedUser?.token || '']
      ])
      }).then((data)=>{
        setRows(data.filter((user)=>{
          return user.role === Role.Beekeeper
        }))
      })

    })()
  },[])

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
                rows?.map((row) => (
                  <TableRow hover sx={{ '&:focus': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }} role="checkbox" tabIndex={0} key={row.login}
                    onClick={() => {
                      setSelectedUser(row)
                      setModalMode(BeeKeeperModalMode.Edition)
                      setIsModalOpen(true)
                    }}
                  >
                    {columns.map((column) => <TableCell key={column.id} align={column.align}>{column.format(row)}</TableCell>)}
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
            tooltipTitle='Ajouter un apiculteur'
          />
        </SpeedDial>
      </Paper>
      <BeeKeeperModal beekeeper={selectedUser} mode={modalMode} isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default BeeKeeperList