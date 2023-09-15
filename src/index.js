import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './Login';
import Cadastro from './components/Cadastro';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Movies from './components/Movies';
import Editafilme from './Editafilme';
<script src="https://kit.fontawesome.com/c80d5d499c.js" crossorigin="anonymous"></script>

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4B56E3',
    },
    secondary: {
      main: '#ffffff',
    },
    success: {
      main: '#44d24c',
    },
    warning: {
      main: '#dec40c',
    },
  },  
})

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/cadastro",
    element:<Cadastro />
  },
  {
    path:"/movies",
    element:<Movies />
  },
  {
    path:"/edita/:id",
    element:<Editafilme />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
