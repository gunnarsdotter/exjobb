import { useContext, useEffect } from "react";
import { ResultContext } from "../../../features/custumer";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function PopupT({array, total}) {
  const [result, setResult] = useContext(ResultContext);

  useEffect(()=>{
  },[]);

  function clickhandler(){
    setResult({
        enhet: result.enhet,
        duration: result.duration,
        popupVisible: false,
        popupTVisible: false,
        title: "",
      });
  }
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#2A2D34",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  return (
     <div id="popup" >
        <div className="card" id="popupCard" style={{top: "20%", bottom: "20%"}} >
            <h2 style={{textAlign:"center"}}>Konto översikt</h2>
            <TableContainer style={{height: "75%"}} >
              <Table aria-label="a dense table" size="small" >
                  <TableHead >
                  <TableRow>
                      <StyledTableCell >Konto</StyledTableCell >
                      <StyledTableCell >Namn</StyledTableCell >
                      <StyledTableCell >Belopp</StyledTableCell >
                      <StyledTableCell >Andel av totalen</StyledTableCell >
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {array.map((a) => (a.map((row) => (
                      <TableRow key={row.id}>
                      <TableCell>{row.konto}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.belopp}</TableCell>
                      <TableCell>{Math.round((row.belopp/total + Number.EPSILON) * 10000) /100 + "%"}</TableCell>
                      </TableRow>
                  ))))}
                  </TableBody>
              </Table>
          </TableContainer>
            <Button variant="contained" id="buttomconer" color="primary" style={{color: "#fff"}} onClick={clickhandler}>
                Stäng</Button>
        </div>
      </div>
    );
  }
  
  export default PopupT