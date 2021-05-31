import React, {useEffect,useContext, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import './user.css';
import {UserContext} from '../../features/custumer'

function UserInfo(){
    const [name, setName] = useState("");
    const [id, setID] = useState(-1);
    const [company, setCompany] = useState("");
    const [mail, setMail] = useState("");
    const [adress, setAdress] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const[activuser] = useContext(UserContext);

    /* SAVE - Button */
    const [buttonDisable, setButtonDisable] = useState(true);
    useEffect(() => {
        // Update the document title using the browser API
        if(activuser.id !== id){
            setName(activuser.name);
            setID(activuser.id);
            setCompany(activuser.company);
            setMail(activuser.mail);
            setAdress(activuser.adress);
            setPhone(activuser.phoneNumber);
            setButtonDisable(true);
        }
    }, [
        id, activuser.id, activuser.name, activuser.company,
        activuser.mail, activuser.adress, activuser.phoneNumber,
    ]);
    function handelButtonAble(e){
        if(buttonDisable !== false) setButtonDisable(false);
        if(e.target.name === "Name")setName(e.target.value);
        else if(e.target.name === "Company")setCompany(e.target.value);
        else if(e.target.name === "Mail")setMail(e.target.value);
        else if(e.target.name === "Adress")setAdress(e.target.value);
        else if(e.target.name === "Telefonnummer")setPhone(e.target.value);
    }
    function handelUserSave(e){
        setButtonDisable(true);
        /*TODO!!!*/
        //save user info to server
    }
    return(
        <div className="userInputBox">
            <h2 >Kundinformation</h2>
            <FormControl>
                <TextField className="outlined-basic inputbox" label="Namn"  name="Name" variant="outlined" value={name} onChange={handelButtonAble} />
                <TextField className="outlined-basic inputbox" label="Kundnummer"  variant="outlined" value={id} InputProps={{readOnly: true,}}/>
                <TextField className="outlined-basic inputbox" label="Företag" name="Company" variant="outlined" value={company} onChange={handelButtonAble}  />
                <TextField className="outlined-basic inputbox" label="E-post" name="Mail" variant="outlined"   value={mail}  onChange={handelButtonAble}/>
                <TextField className="outlined-basic inputbox" label="Adress"  name="Adress" variant="outlined"  value={adress}  onChange={handelButtonAble}/>
                <TextField className="outlined-basic inputbox" label="Telefonnummer" name="Phone" variant="outlined"  value={phoneNumber}  onChange={handelButtonAble}/>
            </FormControl>
            <div className="userButton">
                <Button variant="contained" disabled={buttonDisable} onClick={handelUserSave} style={{color: "#fff"}}  color="primary">Spara</Button>
            </div>
        </div>
    );
}
export default UserInfo;