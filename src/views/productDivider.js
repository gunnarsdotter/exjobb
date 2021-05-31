import React from "react";
import bild from '../fordela.PNG';

function ProductDivider() {
    return (<div>
        <h1>Fördela kostnaderna</h1>
        <div className="fordela">
        <img src={bild} alt="Fördelabild"></img></div>
      </div>
    );
  }
  
  export default ProductDivider;