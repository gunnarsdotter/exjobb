import { useContext, useEffect, useState } from "react";
import { ResultContext } from "../../../features/custumer";
import Button from '@material-ui/core/Button';
import { nyckeltalstext, stapeldiagramstext,
  textrutatext,  multistapeldiagramtext,
  linjegrafstext 
} from "../../../features/texter";

function Popup() {
  const [result, setResult] = useContext(ResultContext);
  const [text, setText] = useState("");
  useEffect(()=>{
    if(result.title === "Multi Stapeldiagram")setText(multistapeldiagramtext);
    else if(result.title === "Stapeldiagram")setText(stapeldiagramstext);
    else if(result.title === "Nyckeltal")setText(nyckeltalstext);
    else if(result.title === "Textruta")setText(textrutatext);
    else if(result.title === "Linjegraf")setText(linjegrafstext);
    
  },[result.title]);

  function clickhandler(){
    setResult({
        enhet: result.enhet,
        duration: result.duration,
        popupVisible: false,
        title: "",
      });
  }
 
  return (
     <div id="popup" onClick={clickhandler}>
        <div className="card" id="popupCard">
            <h2 style={{textAlign:"center"}}>{result.title}</h2>
            {text}
            <Button variant="contained" id="buttomconer" color="primary" style={{color: "#fff"}} onClick={clickhandler}>
                Stäng</Button>
        </div>
      </div>
    );
  }
  
  export default Popup