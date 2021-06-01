import React, {useState, useContext, useEffect} from "react";
import './diagram.css';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import {YearContext, ResultContext} from '../../features/custumer'

function TextValue(props) {
  const [result, setResult] = useContext(ResultContext);
  const [year] = useContext(YearContext);
  const [color, setColor] = useState("#5EBF26");
  useEffect(()=>{
    props.text > 0 ? setColor("#00B309") : setColor("#E00022");
  },[props.text]);

  function helpfunc(){
    setResult({
      enhet: result.enhet,
      duration: result.duration,
      popupVisible: true,
      title: "Textruta",
    })
  }

  return (
      <div className="card" id="textValue" >
        <div className="rightcorner">
            <IconButton  id="barhelp" aria-label="Filter" onClick={helpfunc} >
              <HelpIcon style={{fontSize: "small"}}   />
            </IconButton>
        </div>
        {props.text >0 ? "Vinst" : "Förlust"} år {year}
        <div className="textValue" style={{color: color}} >
          {props.text >0 ? "+" : ""}
          {props.text + result.enhet}
        </div>
      </div>
    );
  }
  //TODO change to tkr
  export default TextValue;