import { useState } from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";

import { useCustomers } from "../../../../hooks/customers";
import { TColumn, TCustomer } from "../../../../shared/types/table.type";

const columns: readonly TColumn[] = [
    { id: 'firstName', label: 'First Name', minWidth: 170 },
    { id: 'lastName', label: 'Last Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170, },
    { id: 'phone', label: 'Phone', minWidth: 170, },
    { id: 'details', label: 'Details', minWidth: 170, },
];

const Board = (): JSX.Element => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { customers, loading, error } = useCustomers();

    const rowsPerPageOptions = [5, 10, 15];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                        {customers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((customers: TCustomer) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={customers.id}>
                                        {columns.map((column) => {
                                            const value = customers[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default Board;