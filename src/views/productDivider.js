import React from "react";
import bild from '../fordela.PNG';

function ProductDivider() {
    return (<div className="root">
        <h1>Fördela kostnaderna</h1>
        <div className="fordela">
        <img src={bild} alt="Fördelabild" style={{width: "100%"}}></img></div>
      </div>
    );
  }
  
  export default ProductDivider;