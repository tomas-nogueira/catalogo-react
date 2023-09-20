import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { Navigate, json, useNavigate } from 'react-router-dom'
import Style from './components/Styles/Login.module.css'
import HeaderLC from './components/HeaderLC'
import Wallpaper from './components/photos/wppLOGIN.jpg'
import Footer from './components/Footer'

function Login(props) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [login, setLogin] = useState(false);
    const [erro, setErro] = useState(false);
    const navigate = useNavigate();
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


    /*O useEffect é o efeito colateral das mudanças realizadas, nesse caso vai limpar o setEmail e setSenha e redirecionar */
    useEffect(() => {
        async function espera() {
            await delay(1000)

            if (login) {
                localStorage.setItem("user", JSON.stringify());
                setEmail("");
                setSenha("");
                navigate("/")
            }
        }
        espera();
    }, [login]);

    function Autenticar(evento) {
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "login", {
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
            .then((reposta) => reposta.json())
            .then((json) => {
                if (json.user) {
                    localStorage.setItem('usuario' , JSON.stringify(json.user._id))
                    setLogin(true)
                }
                else {
                    localStorage.removeItem('usuario');
                    setErro(true);
                }
            })
            .catch((erro) => { setErro(true) })

    }

    return (
        <>
            <HeaderLC></HeaderLC>
                <Container component="section" maxWidth="xs" sx={{
                    height:"28rem",
                    backgroundColor:"#95C2FC",
                    borderRadius:"30px",
                    display:"flex",
                    justifyContent:"center",
                    mt:"12rem"
                }}>
                    <Box className={Style.box} sx={{ borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                        <h2 className={Style.login}>Login</h2>
                        {erro && (<Alert severity="warning">Revise seus dados e tente novamente</Alert>) /*Renderização condicional, se erro for true irá exibir o que está dentro dos parênteses */}
                        <Box component="form" onSubmit={Autenticar}>
                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    backgroundColor:"white"
                                }}
                            />
                            <TextField
                                type="password"
                                label="Senha"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)} /*Qualquer alteração realizada no campo senha, vai alterar o valor em tempo real */
                                sx={{
                                    backgroundColor:"white"
                                }}
                            />
                            <Button variant="contained" type="submit" fullWidth size='large' sx={{ mt: 2, mb: 2, }}>LOGIN</Button>
                            <Grid container>
                                <Grid item xs sx={{
                                    color:"white",
                                    fontSize:"1.2rem"
                                }}>
                                    Esqueci a Senha
                                </Grid>
                                <a item href='http://localhost:3000/cadastro' className={Style.cadastrara}>
                                    Cadastrar
                                </a>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
        </>
    )
}

export default Login
