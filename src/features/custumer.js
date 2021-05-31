import React from 'react'
import {utgiftermjolk1, utgiftermjolk2, utgiftermjolk3} from './mjolk'
import {utgiftervaxt1, utgiftervaxt2, utgiftervaxt3} from './vaxt'
import {utgiftermaskin1, utgiftermaskin2, utgiftermaskin3} from './maskin'
//Year
export const yeararray = [2018, 2019, 2020];
export const YearContext = React.createContext();
//User
export const custumers = [
  {
    name: "Stora Gård",
    id: 0,
    company: "Hagebergs AB",
    mail: "info@ha.se",
    adress: "lila edet 3",
    phoneNumber:"0732818282",},
  {
    name: "Lila Gård",
    id: 1,
    company: "SDF AB",
    mail: "info@sdf.com",
    adress: "lila gärdet",
    phoneNumber:"0784383478",},
  {
    name: "Fagerslätt östergård",
    id: 2,
    company: "Folkesons AB",
    mail: "info@folkesons.se",
    adress: "Rättviksgatan 34",
    phoneNumber:"0705030306",}
];
export const UserContext = React.createContext();

export const ResultContext = React.createContext();

export const resultinit = {
  enhet: "tkr",
  duration: 500,
  popupVisible: false,
  title: "",
};

export const driftsgrenarnamn = [
  "Hela företaget",
  "Mjölk", 
  "Växt",
  "Maskin",  
];
function calculate(value){
  return value.direkta + value.indirekta1 + value.indirekta2 + value.avskrivningar + value.finansiella;
}
const driftssgrenvärde = [
  [
    {
      name: "Mjölk",
      values: 
      {        
        intakt:8271,
        utgift:calculate(utgiftermjolk1)
      }
    },
    {
      name: "Växt",
      values: 
      {      
        intakt:1958,
        utgift:calculate(utgiftervaxt1)
      },
    },
    {
      name: "Maskin",
      values: 
      {
        intakt:2310,
        utgift:calculate(utgiftermaskin1)
      },
    }
  ],
  [
    {
      name: "mjölk",
      values: 
      {        
        intakt:4262,
        utgift:calculate(utgiftermjolk2)
      }
    },
    {
      name: "Växt",
      values: 
      {      
        intakt:2263,
        utgift:calculate(utgiftervaxt2)
      },
    },
    {
      name: "Maskin",
      values: 
      {
        intakt:1515,
        utgift:calculate(utgiftermaskin2)
      },
    },
  ],
  [
    {
      name: "Mjölk",
      values: 
      {        
        intakt:7270,
        utgift: calculate(utgiftermjolk3)
      }
    },
    {
      name: "Växt",
      values: 
      {      
        intakt:1862,
        utgift:calculate(utgiftervaxt3)
      },
    },
    {
      name: "Maskin",
      values: 
      {
        intakt:2208,
        utgift:calculate(utgiftermaskin3)
      },
    },
    
  ]];
  export const driftsgrenar = [
    {
        year: yeararray[0],
        gren: driftssgrenvärde[0]
    },
    {
        year: yeararray[1],
        gren: driftssgrenvärde[1]
    },
    {
        year: yeararray[2],
        gren: driftssgrenvärde[2]
    }
]



 //nyckeltal i bulletCard
