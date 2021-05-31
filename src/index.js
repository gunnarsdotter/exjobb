import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#8AB959",
      color: "#fff"
    },
    secondary: {
      main: "#2A2D34",
      //main: "#fff176",
      g: "#fdc543",
      light: "#71eec0",
      dark: "#255892",
    },
  },
});


ReactDOM.render(
    <ThemeProvider theme={myTheme}>
      <Routes /> 
    </ThemeProvider>,
  document.getElementById('root')
);

