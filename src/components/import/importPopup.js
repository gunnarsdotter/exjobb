import React, {useContext} from "react";

import ImportTab from './importTab'
import Select from '@material-ui/core/Select';
import './import.css'
import {yeararray, YearContext} from '../../features/custumer'

function ImportPopup(props) {
    const[activyear, setYear] = useContext(YearContext);
    const handleChangeYear = (event) => {
      setYear(event.target.value)
        if(event.target.value !== ""){
            //props.dispatch({ type: "CHANGEYEAR", value: event.target.value});
        }
    }
    return (
      <div className="popup" style={{height: "fit-content"}}>
        <h1>Importera bokföring</h1>
        Du kan välja att importera data från antingen en SIE-fil eller Excel. 
        <div id="text1">
            <b > Ange bokföringsår:  </b>
            <Select  native
                value={activyear}
                onChange={handleChangeYear}
                className="border">
                {yeararray.map((year) => (
                    <option key={year} value={year}>
                    {year}
                    </option>))}
            </Select>
        </div>        
       <ImportTab/>
      </div>
    );
  }
  export default ImportPopup;