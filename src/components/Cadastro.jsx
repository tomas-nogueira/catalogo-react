import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Style from './Styles/cadastro.module.css'
import Wall from './photos/wppLOGIN.jpg'
import Header from './Header';
import HeaderLC from './HeaderLC';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Cadastro() {
  
  const[nome, setNome]=useState("");
  const[email, setEmail]=useState("");
  const[tel, setTel]=useState("");
  const[senha, setSenha]=useState("");
  const[cpf, setCpf]=useState("");
  const[cadastro, setCadastro]=useState(false);
  const[erro, setErro]=useState(false);
  const navigate=useNavigate();
  
  
    function Cadastrar( evento ){
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "usuarios",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nome: nome,
                    email: email,
                    cpf: cpf,
                    tel: tel,
                    senha: senha
                }
            )
        })
        .then( (resposta) => resposta.json() )
        .then( (json) => {
            if(json.cpf){
                localStorage.setItem("name", JSON.stringify(json.nome))
                setCadastro( true );
                setErro( false );
            }
            else{
                setErro( true );
                setCadastro( false );
            }
        } )
        .catch( (erro) => { setErro( true )} )
    }

    useEffect( () =>{
        setNome("");
        setEmail("");
        setCpf("");
        setTel("");
        setSenha("");
        setCadastro(false);
    },[cadastro]); 

    return (
    <div>
        <HeaderLC></HeaderLC>
        <Container component="section" maxWidth="xs"  sx={{
             height:"42rem",
             backgroundColor:"#95C2FC",
             borderRadius:"30px",
             display:"flex",
             justifyContent:"center",
             mt:"5rem"
        }}>
        <Box sx={{ borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <h2 className={Style.cadastro}>Cadastre seu usuário. </h2>
                {erro && (<Alert severity='warning' sx={{mt:2, mb: 2}}>Desculpe tente novamente</Alert>)}
                {cadastro && (<Alert severity='success' sx={{mt:2, mb: 2}}>Seu cadastro foi um sucesso</Alert>)}
            <Box component="form" onSubmit={Cadastrar}>
                <TextField 
                type="text" 
                label="Nome" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                sx={{
                    backgroundColor:"white"
                }}
                />
                <TextField 
                type="email" 
                label="Email" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                    backgroundColor:"white"
                }}
                />
                <TextField 
                type="tel" 
                label="Telefone" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                required
                sx={{
                    backgroundColor:"white"
                }}
                />
                <TextField 
                type="number" 
                label="CPF" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
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
                onChange={(e) => setSenha(e.target.value)}
                required
                sx={{
                    backgroundColor:"white"
                }}
                />
                <Button variant="contained" type="submit" size='large' fullWidth sx={{mt: 2, mb: 2}}>Cadastrar</Button> 
                <Grid container>
                    <Grid item xs sx={{
                        color:"white",
                        fontSize:"1.3rem"
                    }}>
                        Suporte
                    </Grid>
                    <a href='./login' className={Style.login}>
                        Login
                    </a>
             </Grid>
            </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Cadastro
