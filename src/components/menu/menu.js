import React from 'react';
import {Link} from "react-router-dom";
import './menu.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Menu() {
  return (
    <div className="menuRoot">
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="menuTitle">
            Exjobb-Driftsgrensanalys
          </Typography>
          <ul className="listStyle">
          <li>
            <Link to="/custumerregistration" className="listItem">Kundregister</Link>
          </li>
          <li>
            <Link to="/import" className="listItem">Importera bokföring</Link>
          </li>
          <li>
            <Link to="/productdivider" className="listItem">Fördela</Link>
          </li>
          <li>
            <Link to="/result" className="listItem">Resultat</Link>
          </li>
          <li>
            <Link to="/sus" className="listItem">SUS</Link>
          </li>
        </ul>
        </Toolbar>
      </AppBar>
    </div>
  );
}
