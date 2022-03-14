import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { get } from 'lodash';

const StyledTableCell = withStyles(() => ({
    head: {
        boxSizing: '',
        fontSize: 17,
        fontFamily: 'Roboto',
        backgroundColor: '#ECECF4',
        color: '#4C4B97',
    },
    body: {
        color: '#4C4B97',
        fontFamily: 'Roboto',
        fontSize: 15,
        maxHeight: '500px',
    },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#EFEFF6',
        },
    },
}))(TableRow);

const useStyles = makeStyles(() => ({
    tableContainer: {
        backgroundColor: '#ECECF4',
        borderRadius: '0px',
        maxHeight: 440,
    },
    table: {
    },
    tableHead: {
        backgroundColor: '#000',
    },
}));

const CustomTable = ({
    columns,
    data,
    Editar,
    compacta,
    handleClickRow,
}) => {
    const classes = useStyles();

    return (
        <>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Grid item sm={12}>
                    <Table
                        className={classes.table}
                        aria-label="Tabela Custom"
                        stickyHeader
                        size={compacta ? 'small' : null}
                    >
                        <TableHead>
                            <TableRow className={classes.tableHead}>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.headerText}
                                        align="center"
                                        style={{ color: '#4C4B97' }}
                                    >
                                        {column.headerText}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.length > 0 ? (
                                data.reverse(),
                                data.map((row) => (
                                    <StyledTableRow
                                        size={compacta ? 'small' : null}
                                        key={row.name}
                                        onClick={
                                            handleClickRow
                                                ? () => handleClickRow(row)
                                                : null
                                        }
                                    >
                                        {columns.map((column) => (
                                            <StyledTableCell align="center">
                                                {column.key === 'menu' ? (
                                                    <Editar row={row} key={row.id} />
                                                ) : null}
                                                {column.Teste ? column.Teste(row) : null}
                                                {column.CustomValue
                                                    ? column.CustomValue(
                                                        get(row, column.key)
                                                    )
                                                    : get(row, column.key)}
                                                {column.FullObject
                                                    ? column.FullObject(row)
                                                    : null}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length}>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                style={{ color: '#4C4B97' }}
                                            >
                                                Não há dados para serem exibidos
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Grid>
            </TableContainer>
        </>
    );
};

export default CustomTable;