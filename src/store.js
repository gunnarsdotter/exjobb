
import {createStore} from 'redux';

const initialState = {
    year: null, 
    years: [
        2020,2019,2018
    ],
    //Custumer
    custumer: {
        name: "",
        id: -1,
        company: "",
        mail: "",
        adress: "",
        phoneNumber:"",},
    custumers: [
        {
          name: "Stora Gård",
          id: 0,
          company: "Hagebergs AB",
          mail: "info@ha.se",
          adress: "Lila edet 3",
          phoneNumber:"0732818282",},
        {
          name: "Lila Gård",
          id: 1,
          company: "Gärdet AB",
          mail: "info@gardet.com",
          adress: "Gärdet 6",
          phoneNumber:"0784383478",},
        {
          name: "Fagerslätt östergård",
          id: 2,
          company: "Folkesons AB",
          mail: "info@folkesons.se",
          adress: "Rättviksgatan 34",
          phoneNumber:"0705030306",}
      ],  
      //Driftsgrensanalys
      driftsgrensanalys:[
          {
              name: "Mjölk",
              custumerID: 0, 


          }
      ],
      //Nyckeltal
      nyckeltal:{
          custumerID: 0,
          name: "",
          value: 0
      },
      nyckeltalAuto:[
          { 
            custumerID: 0,
            name: "Vinst",
            value: 110,
          },
      ],
      nyckeltalStandard:[
        {
          custumerID: 0,
          name: "Vinst",
          value: 13,
        },
    ]

};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGECUSTUMER":
            
            return {
                custumer: action.value
            };
        case "ADDCUSTUMER":
            return {
                
            };
        case "DELETECUSTUMER":
        
            return {
                custumer: action.value
            };
        case "CHANGEYEAR":
            
            return {
                
                year: action.value
            };
         
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;
