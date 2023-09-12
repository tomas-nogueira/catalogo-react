import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

function Cadastro() {
  
  const[nome, setNome]=useState("");
  const[email, setEmail]=useState("");
  const[tel, setTel]=useState("");
  const[senha, setSenha]=useState("");
  const[cpf, setCpf]=useState("");
  const[cadastro, setCadastro]=useState(false);
  const[erro, setErro]=useState(false);  
  
    function Cadastrar( evento ){
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "users" ,{
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
      <Container component="section" maxWidth="xs">
        <Box sx={{mt: 20, borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Typography component="h1" variant="h4">Junte-se hoje à Twitch </Typography>
                {erro && (<Alert severity='warning' sx={{mt:2, mb: 2}}>Desculpe tente novamente</Alert>)}
                {cadastro && (<Alert severity='success' sx={{mt:2, mb: 2}}>Seu cadastro foi um sucesso</Alert>)}
            <Box component="form" onSubmit={Cadastrar}>
                <TextField 
                type="text" 
                label="Nome completo" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
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
                />
                <Button variant="contained" type="submit" fullWidth sx={{mt: 2, mb: 2}}>Cadastrar</Button> 
                <Grid container>
                    <Grid item xs>
                        Suporte
                    </Grid>
                    <Grid item>
                        Login
                    </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Cadastro
