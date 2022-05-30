import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Monodose } from '../models/Monodose'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MonodoseModal, { MonodoseModalMode } from './MonodoseModal'

interface Column {
    id: 'location' | 'productionstartdate' | 'productionenddate' | 'dluodate' | 'honeyvariety'
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: 'location', label: 'Localisation', minWidth: 170 },
    { id: 'productionstartdate', label: 'Date début de production', minWidth: 170 },
    { id: 'productionenddate', label: 'Date fin de production', minWidth: 170 },
    { id: 'dluodate', label: 'Date DLUO', minWidth: 170 },
    { id: 'honeyvariety', label: 'Variété du miel', minWidth: 170 }
]

// TODO: random data, remove them after connecting the list to API
const rows: Monodose[] = [
    {
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
    },
]

const MonodoseList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [selectedMonodose, setSelectedMonodose] = React.useState<Monodose>()
    const [modalMode, setModalMode] = React.useState<MonodoseModalMode>(MonodoseModalMode.Edition)

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
                                    <TableRow hover sx={{ '&:focus': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }} role="checkbox" tabIndex={0} key={row.id}
                                        onClick={() => {
                                            setSelectedMonodose(row)
                                            setModalMode(MonodoseModalMode.Edition)
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        {columns.map((column) => <TableCell key={column.id} align={column.align}>{row[column.id].toLocaleString()}</TableCell>)}
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