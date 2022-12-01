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

import useCustomers from "../../../../hooks/customers";
import { TColumn, TCustomer } from "../../../../shared/types/table.type";
import BasicModal from "../BasicModal";
import Loader from "../Loader";

const columns: readonly TColumn[] = [
    { id: 'firstName', label: 'First Name', minWidth: 150 },
    { id: 'lastName', label: 'Last Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 170, },
    { id: 'phone', label: 'Phone', minWidth: 170, },
    { id: 'company', label: 'Company', minWidth: 170, },
];

const Board = (): JSX.Element => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const { customers, addCustomer, loading } = useCustomers();
    const rowsPerPageOptions: number[] = [5, 10, 15];

    const createHandler = (customer: TCustomer) => addCustomer(customer);
    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
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
                {loading && <Loader />}
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
            <BasicModal createHandler={createHandler} />
        </>
    );
}

export default Board;