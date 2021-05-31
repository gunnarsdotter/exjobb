import React from "react";
import bild from '../likertskala.PNG';

function SUS() {
    return (<div className="root">
        <h1>SUS</h1>
          <p>1. Jag tror att jag skulle vilja använda det här verktyget.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>2. Jag tycker att verktyget var onödigt komplext.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>3. Jag tycker att verktyget var lätt att använda.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>4. Jag tror att jag skulle behöva hjälp av en teknisk person för att kunna använda det här verktyget.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>5. Jag tycker att de olika funktionerna i det här verktyget var välintegrerade.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>6. Jag tycker att det varför mycket som var inkonsekvent i det här verktyget.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>7. Jag skulle föreställa mig att de flesta skulle lära sig det här verktyget väldigt fort.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>8. Jag tycker att verktyget var väldigt besvärligt att använda.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>9. Jag känner mig mycket säker på att använda verktyget.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
          <p>10. Jag behövde lära mig många saker innan jag kunde komma igång med det här verktyget.</p>
          <img src={bild} alt="likertskala mellan 1-5" style={{width: "50%"}}></img>
         
      </div>
    );
  }
  
  export default SUS;