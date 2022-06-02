import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Monodose } from '../api/models/Monodose'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MonodoseModal, { MonodoseModalMode } from './MonodoseModal'
import { MonodoseApiClient } from '../api/main'
import { UserContext } from '../context/UserContext'

interface Column {
    id: string
    label: string
    minWidth?: number
    align?: 'right'
    format: (m: Monodose) => string | undefined
}

const columns: readonly Column[] = [
    { id: 'location', label: 'Localisation', minWidth: 170, format: (m) => m.location },
    { id: 'dates.startofproduction', label: 'Date début de production', minWidth: 170, format: (m) => m.dates?.startOfProduction },
    { id: 'dates.endofproduction', label: 'Date fin de production', minWidth: 170, format: (m) => m.dates?.endOfProduction },
    { id: 'dates.dluo', label: 'Date DLUO', minWidth: 170, format: (m) => m.dates?.dluo },
    { id: 'honeyvariety', label: 'Variété du miel', minWidth: 170, format: (m) => m.honeyVariety }
]

const MonodoseList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [selectedMonodose, setSelectedMonodose] = React.useState<Monodose>()
    const [modalMode, setModalMode] = React.useState<MonodoseModalMode>(MonodoseModalMode.Edition)
    const { loggedUser } = React.useContext(UserContext)
    const [rows, setRows] = React.useState<Monodose[]>()

    React.useEffect(() => {
        (async () => {
            await MonodoseApiClient.getAllMonodoses({
                headers: new Headers([
                    ['Token', loggedUser?.token || '']
                ])
            }).then((data) => {
                setRows(data)
            })

        })()
    }, [])

    return (
        <>
            <Paper sx={{ position: 'absolute', top: '160px', bottom: '40px', right: '40px', left: '40px', overflow: 'hidden' }}>
                <TableContainer sx={{ height: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
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
                                rows?.map((row, index) => (
                                    <TableRow hover sx={{ '&:focus': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }} role="checkbox" tabIndex={0} key={index}
                                        onClick={() => {
                                            setSelectedMonodose(row)
                                            setModalMode(MonodoseModalMode.Edition)
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        {columns.map((column, index) => <TableCell key={index} align={column.align}>{column.format(row)}</TableCell>)}
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
                            setModalMode(MonodoseModalMode.Creation)
                            setIsModalOpen(true)
                        }}
                        />
                        }
                        tooltipTitle='Ajouter'
                    />
                </SpeedDial>
            </Paper>
            <MonodoseModal monodose={selectedMonodose} mode={modalMode} isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default MonodoseList