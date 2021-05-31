import React, {useState, useContext} from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';
import './user.css';
import {custumers, UserContext} from '../../features/custumer'

function Register() {
    const [buttonDisable, setButtonDisable] = useState(true);
    const[activuser, setUser] = useContext(UserContext);
    
    function handelUserCreate(e){
        /*TODO!!!*/
       /* props.custumers.push({
            name: "Ny kund",
            id: ID, 
            company:"",
            adress:"",
            phonenumber: ""
        });
        let newID = ID+1;
        setID(newID);*/
    }
    function handelUserDelete(e){
        /*TODO!!!*/
    }
    const handleChange = (event) => {
        if(event.target.value !== ""){
            setButtonDisable(false);
            setUser(custumers[event.target.value]);
        }
    };      
  return (
    <div className="register">            
            <InputLabel shrink htmlFor="custumerSelect">
            Kunder
            </InputLabel>
            <Select multiple native
            className="custumerSelect"
            onChange={handleChange}
            inputProps={{id: 'custumerSelect', }}>
            {custumers.map((custumer) => (
                <option key={custumer.id} value={custumer.id}>
                {custumer.name}
                </option>))}
            </Select>
            <div id="userButton" className="userButton">
                <Button variant="contained" onClick={handelUserCreate} color="primary" style={{color: "#fff"}} > Ny Kund </Button>
                <Button id="button" disabled={buttonDisable} variant="contained" onClick={handelUserDelete} color="primary" style={{color: "#fff"}} > Radera </Button>
            </div>
    </div>
  );
}
export default Register;
