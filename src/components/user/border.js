import React, {useContext}from 'react'
import Select from '@material-ui/core/Select';
import './user.css'
import {custumers, yeararray, YearContext, UserContext} from '../../features/custumer'

function Border(){
    const[activyear, setYear] = useContext(YearContext);
    const[activuser, setUser] = useContext(UserContext);

    const handleChangeCustumer = (event) => {
        if(event.target.value !== ""){
            setUser(custumers[event.target.value]);
        }
    }
    const handleChangeYear = (event) => {
        if(event.target.value !== ""){
            setYear( event.target.value); 
        }
    }
    return (
        <div id="border" >
            Petra Gunnarsdotter /
            <Select  native 
            value={activuser.id || 0}
            onChange={handleChangeCustumer}
            className="border">
            {custumers.map((custumer) => (
                <option key={custumer.id} value={custumer.id}>
                {custumer.name}
                </option>))}
            </Select> 
            /
            <Select  native
            value={activyear || 0}
            onChange={handleChangeYear}
            className="border">
            {yeararray.map((year) => (
                <option key={year} value={year}>
                {year}
                </option>))}
            </Select>
        </div>
    );
    
}

export default Border;