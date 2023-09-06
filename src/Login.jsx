import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { Navigate, json, useNavigate } from 'react-router-dom'

function Login(props) {

    /*Ao usar o UseState, precisa ter a const do elemento e o set que o acomapnha, pois ele que vai fazer a mudança */
    const[ email, setEmail ]= useState("");
    const[ senha, setSenha ] = useState("");
    const[ lembrar, setLembrar ] = useState( false );// é false pq a intenção é deixar a caixa aparecendo//
    const[ login, setLogin ]= useState( false );// é false pq o usuario entra a pagina sem estar logado//
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

    /*Está requisitando uma autenticação da api */
    function Autenticar(evento){ //o evento pode ser abreviado pra e//
        evento.preventDefault();
        fetch("http://10.139.75.32:8080/login" ,{
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
        <Box sx={{mt: 20, borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography component="h1" variant="h4">Entrar</Typography>
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
  )
}

export default Login
