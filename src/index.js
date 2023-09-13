import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './Login';
import Cadastro from './components/Cadastro';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Movies from './components/Movies';
import Editafilme from './Editafilme';

const theme = createTheme({
  palette: {
      primary: {
        main: '#7B08D6',
      },
      secondary: {
        main: '#572270',
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
