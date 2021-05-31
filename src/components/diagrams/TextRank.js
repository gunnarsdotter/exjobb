import React, {useContext} from "react";
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import './diagram.css';
import { ResultContext } from "../../features/custumer";

import Table from './table';


function Textrank({arrayI, arrayU, totalIntakt, totalUtgift}) {
  const [result,setResult] = useContext(ResultContext);

function helpfunc(){
  setResult({
    enhet: result.enhet,
    duration: result.duration,
    popupVisible: true,
    title: "5 Största Inkomster och utgifterna",
  })
}
return (
    <div className="card" id="Textrank">
        {arrayI.length} största inkomsterna
        <div className="rightcorner">
          <IconButton  id="barhelp" aria-label="Filter" onClick={helpfunc} >
            <HelpIcon style={{fontSize: "small"}}   />
          </IconButton>
        </div>
        <Table array={arrayI} total={totalIntakt} good={true} />   
        {arrayU.length} största utgifterna
        <Table array={arrayU} total={totalUtgift} good={false} />   
    </div>
  );
}

export default Textrank