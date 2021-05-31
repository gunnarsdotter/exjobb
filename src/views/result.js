import React, {useEffect, useContext, useState} from "react";
import {
  Multibar, BulletCard, Linegraph, TextValue, Bargraph, CirkelCard, Textrank
} from '../components/diagrams/index';
import Popup from '../components/diagrams/Popup/popupCard'
import PopupT from '../components/diagrams/Popup/popupCardtable'
import '../index.css'
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { ResultContext,YearContext, driftsgrenar, yeararray, resultinit, driftsgrenarnamn } from '../features/custumer';
import { nyckeltal } from '../features/nyckeltal';
import { lmjolk, smjolk, mjolkutgift} from '../features/mjolk';
import { lvaxt, svaxt, vaxtutgift} from '../features/vaxt';
import { lmaskin, smaskin, maskinutgift} from '../features/maskin';

function calculateTotal(array){
  let u = 0;
  let i = 0;
  array.gren.forEach(e => {
    u = u+e.values.utgift;
    i = i+e.values.intakt;
  });
  return [u,i];
}
const line =[
  {
    year: 2018, 
    date: new Date(2018, 0, 1),
    data: calculateTotal(driftsgrenar[0])
  },{
    year: 2019,
    date: new Date(2019, 0, 1),
    data: calculateTotal(driftsgrenar[1])
  },{
    year: 2020,
    date: new Date(2020, 0, 1),
    data: calculateTotal(driftsgrenar[2])
  }] 
  function hela(totalIntakt,totalUtgift, driftsgrenar, line, setPage ){
    return(<div>
        <div className='row' style={{height:"170px"}}>
            <Bargraph title="Hela företaget" intakt={totalIntakt} utgift={totalUtgift}></Bargraph>
            <TextValue text={totalIntakt-totalUtgift}></TextValue>
            <Multibar title="Driftsgrenarna för företaget"  intakt={totalIntakt} data={driftsgrenar.gren} setPage={setPage}/>
        </div>
        <div className='row' style={{height:"500px"}}>
          <Linegraph title="Inkomster och kostnader per år" data={line}/>
          <BulletCard array={nyckeltal[0]}/>
        </div>
      </div>
    );
  }
  function gren(page, activID, ){
      var totalIntakt = driftsgrenar[activID].gren[page-1].values.intakt;
      var totalUtgift = driftsgrenar[activID].gren[page-1].values.utgift;
      var arrayI = lmjolk[activID];
      var arrayU = smjolk[activID];
      var array = mjolkutgift[activID];
      
      if(page === 2){
        arrayI = lvaxt[activID];
        arrayU = svaxt[activID];
        array = vaxtutgift[activID];
      }
      if(page === 3){
        arrayI = lmaskin[activID];
        arrayU = smaskin[activID];
        array = maskinutgift[activID];
      }/*
      if(page === 4){
        arrayI = lmaskin[activID];
        arrayU = smaskin[activID];
        var array = utgiftermaskin1;
      }
      if(page === 5){
        arrayI = lmaskin[activID];
        arrayU = smaskin[activID];
        var array = utgiftermaskin1;
      }*/
    return(<div>
        <div className='row' style={{height:"170px"}}>
          <Bargraph title={driftsgrenarnamn[page]} intakt={totalIntakt} utgift={totalUtgift}></Bargraph>
          <TextValue text={totalIntakt-totalUtgift} title={driftsgrenarnamn[page]}></TextValue> 
          </div>
          <div className='row' style={{height:"500px"}}>
          <Textrank totalIntakt={totalIntakt} totalUtgift={totalUtgift} arrayI={arrayI} arrayU={arrayU} />
          <CirkelCard vinst={totalIntakt-totalUtgift}  totalIntakt={totalIntakt} array={array} title={("Utgiftsuppdelning på driftsgren: "+ driftsgrenarnamn[page])}/>
          <BulletCard array={nyckeltal[page]}/> 
        </div>
      </div>
    );
  }
function Result() {
  const [title] = useState("Resultat");
  const [result, setResult] = useState(resultinit);
  const [activID, setactivID] = useState(0);
  const [activyear] = useContext(YearContext);
  const [totalUtgift, setTotalUtgift] = useState(0);
  const [totalIntakt, setTotalIntakt] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(()=>{
    function findID(){
      for(let i = 0; i < yeararray.length; i++){
        if(yeararray[i] == activyear) return setactivID(i);
      }
    }
    findID()
    let values = calculateTotal(driftsgrenar[activID]);
    setTotalUtgift(values[0]);
    setTotalIntakt(values[1]);
    
    // Update the document title using the browser API
    document.title = "Exjobb - " + title;
  },[title,totalIntakt, totalUtgift, activyear, activID]);
  
  function showing(i){
    if(i === 0)return hela(totalIntakt,totalUtgift, driftsgrenar[activID], line, setPage);
    else return gren(page, activID );
  }
    return (
      <ResultContext.Provider value={[result, setResult]} className="root">
        <div className="row">
          <IconButton id="pil" aria-label="prew"  onClick={(e) => {if(page-1 < 0)setPage(driftsgrenarnamn.length-1); else setPage(page-1)}}>
            <ArrowBackIosIcon/>
          </IconButton>
          <h1>{title} - {driftsgrenarnamn[page]}</h1> 
          <IconButton id="pil" aria-label="next" onClick={(e) => {if(page+1 >= driftsgrenarnamn.length)setPage(0); else setPage(page+1)}}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        {showing(page)}
        {result.popupVisible ? <Popup/>: null}
        {result.popupTVisible ? <PopupT total={totalIntakt} array={smaskin} />: null}
      </ResultContext.Provider>
    );
  }
  
  export default Result;

