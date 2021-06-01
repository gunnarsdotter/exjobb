import React from "react";

import './diagram.css';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


function MyTable({array, total, good}) {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: good ? "#005917" : "#590004",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  return (
    <TableContainer>
        <Table aria-label="a dense table" size="small" >
            <TableHead >
            <TableRow>
                <StyledTableCell >Konto</StyledTableCell >
                <StyledTableCell >Namn</StyledTableCell >
                <StyledTableCell >Belopp</StyledTableCell >
                <StyledTableCell >Andel av {good? "total inkomst": "total utgift"}</StyledTableCell >
            </TableRow>
            </TableHead>
            <TableBody>
            {array.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{row.konto}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.belopp}</TableCell>
                <TableCell>{Math.round((row.belopp/total + Number.EPSILON) * 10000) /100 + "%"}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}
export default MyTable