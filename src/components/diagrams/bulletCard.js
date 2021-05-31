import React, {useContext} from "react";
import Bulletgraph from "./bulletgraf";
import TuneIcon from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import './diagram.css';
import { ResultContext } from "../../features/custumer";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function BulletCard({array}) {
  const [result,setResult] = useContext(ResultContext);
  var v = 10;
  const [age, setAge] = React.useState(1);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  const items = array?.map((obj)=>
          <Bulletgraph key={obj.title} object={obj} v={v}/>
      );
function helpfunc(){
  setResult({
    enhet: result.enhet,
    duration: result.duration,
    popupVisible: true,
    popupTVisible: false,
    title: "Nyckeltal",
  })
}
function openFilter(){
  if(document.getElementById("filter").style.visibility === "visible"){
      document.getElementById("filter").style.visibility =  "collapse"
  }
  else{
    document.getElementById("filter").style.visibility =  "visible";
  }   
}
return (
    <div className="card" id="bulletCard">
        Nyckeltal
        
        <div className="rightcorner">
          <IconButton  id="nyckelbutton" aria-label="Filter" style={{position: "relative"}} onClick={openFilter}>
            <TuneIcon />
          </IconButton>
            <div id="filter" className="tooltip">
              <b>Filtrera efter:</b>
              <div className="filterslot"><label >Område</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={1}>Hela Sverige</MenuItem>
                <MenuItem value={10}>Norra Sverige</MenuItem>
                <MenuItem value={20}>Mellan Sverige</MenuItem>
                <MenuItem value={30}>Södra Sverige</MenuItem>
              </Select>
              </div>
              <div className="filterslot"><label >Ekologiskt: </label><input type="checkbox" id="eko" name="eko"/>  </div>
              <div className="filterslot"><label >Robot:</label><input type="checkbox" id="Robot" name="Robot"/>  </div>
            </div>
          <IconButton  id="barhelp" aria-label="Filter" onClick={helpfunc} >
            <HelpIcon style={{fontSize: "small"}}   />
          </IconButton>
       
        </div>
        <div id="bulletToltip" className="tooltip"></div>
        {items}
    </div>
  );
}

export default BulletCard