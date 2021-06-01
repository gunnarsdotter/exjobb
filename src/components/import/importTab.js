import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './import.css'
import Bild1 from '../../1.PNG';
import Bild2 from '../../2.PNG';
import Bild3 from '../../3.PNG';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
    
function ImportTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Importera från SIE-fil" />
            <Tab label="Importera från Excel" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Hämta data med SIE-fil.
          <img src={Bild1} alt="SIE-fil" style={{float:"right",width: "100%"}}></img>
          <img src={Bild3} alt="knapp" style={{width: "20%", float: "right"}}></img>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Hämta data med Excel.
          <p style={{fontSize:"12px"}}>Data skall vara tabseparerade med följande kolumner som man får när man klipper ut från Excel.
             Det går bra att kopiera en hel resultaträkning från Excel och klistra in den här.
             Det gör inget om det är fler kolumner eller tomma rader. 
             Programmet importerar bara de rader som har ett kontunummer i första kolumnen.</p>
          <img src={Bild2} alt="Excel" style={{width: "100%", float: "right"}}></img>
          <img src={Bild3} alt="knapp" style={{width: "20%", float: "right"}}></img>
        </TabPanel>
        
      </div>
    );
  }
  export default ImportTab;