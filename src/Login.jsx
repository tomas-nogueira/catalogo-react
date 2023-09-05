import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { Navigate, json, useNavigate } from 'react-router-dom'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#7B08D6',
        },
        secondary: {
          main: '#572270',
        },
      },   
})

function Login(props) {

    const[ email, setEmail ]= useState("");
    const[ senha, setSenha ] = useState("");
    const[ lembrar, setLembrar ] = useState( false );// é false pq a intenção é deixar a caixa aparecendo//
    const[ login, setLogin ]= useState( false );// é false pq o usuario entra a pagina sem estar logado//
    const[ erro, setErro] = useState(false);
    const navigate = useNavigate();
    
    useEffect( () => {
        if( login ){
            localStorage.setItem("user", JSON.stringify( {email:email} ));
            setEmail( "" );
            setSenha( "" );
            navigate( "/" )
        }

    },[ login] );

    function Autenticar(evento){ //o evento pode ser abreviado pra e//
        evento.preventDefault();
        fetch("https://api.escuelajs.co/api/v1/auth/login" ,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: senha
                }
            )
        })
        .then( (reposta) => reposta.json() )
        .then( (json) => {
            if(json.statusCode === 401) {
                setErro(true)
            }
            else( 
                setLogin(true)
            )
        } )
        .catch( (erro) => { setErro( true )} )

    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="section" maxWidth="xs">
        <Box sx={{mt: 20, borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography component="h1" variant="h4">Entrar</Typography>
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
                onChange={(e) => setSenha(e.target.value)}
                />
                <FormControlLabel control={<Checkbox value={lembrar} name="lembrar" onChange={(e) => setLembrar( !lembrar )}/>} label="Lembrar-me"/> 
                <Button variant="contained" type="submit" fullWidth sx={{mt: 2, mb: 2}}>Enviar</Button> 
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
    </ThemeProvider>
  )
}

export default Login
