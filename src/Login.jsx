import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { Navigate, json, useNavigate } from 'react-router-dom'
import Style from './Login.module.css'

function Login(props) {

    const[ email, setEmail ]= useState("");
    const[ senha, setSenha ] = useState("");
    const[ login, setLogin ]= useState( false );
    const[ erro, setErro] = useState(false);
    const navigate = useNavigate();
    
    /*O useEffect é o efeito colateral das mudanças realizadas, nesse caso vai limpar o setEmail e setSenha e redirecionar */
    useEffect( () => {
        if( login ){
            localStorage.setItem("user", JSON.stringify( {email:email} ));
            setEmail( "" );
            setSenha( "" );
            navigate( "/" )
        }

    },[ login] );

    function Autenticar(evento){ 
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "login" ,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    senha: senha
                }
            )
        })
        .then( (reposta) => reposta.json() )
        .then( (json) => {
            if(json.user) {
                setLogin(true)
            }
            else( 
                setErro(true)
            )
        } )
        .catch( (erro) => { setErro( true )} )

    }

  return (
      <Container component="section" maxWidth="xs">
        <Box className={Style.box}>
            <Typography className="h4" component="h1" variant="h4" >Login</Typography>
            { erro && (<Alert severity="warning">Revise seus dados e tente novamente</Alert>) /*Renderização condicional, se erro for true irá exibir o que está dentro dos parênteses */}
            <Box component="form" onSubmit={Autenticar}>
                <TextField 
                type="email" 
                label="Email" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <TextField 
                type="password" 
                label="Senha" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={senha}
                onChange={(e) => setSenha(e.target.value)} /*Qualquer alteração realizada no campo senha, vai alterar o valor em tempo real */
                /> 
                <Button variant="contained" type="submit" sx={{mt: 2, mb: 2, }}>LOGIN</Button> 
                <Grid container>
                    <Grid item xs>
                        Esqueci a Senha
                    </Grid>
                    <Grid item>
                        Cadastrar
                    </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
  )
}

export default Login
