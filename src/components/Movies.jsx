import { Alert, Autocomplete, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function Movies() {

    const options = ['Terror', 'Suspense', 'Drama', 'Comédia', 'Ação'];
    const [titulo, setTitulo]=useState("");
    const [descricao, setDescricao]=useState("");
    const [ano, setAno]=useState("");
    const [duracao, setDuracao]=useState("");
    const [categoria, setCategoria]=useState("");
    const [imagem, setImagem]=useState("");
    const [cadastro, setCadastro]=useState( false );
    const [erro, setErro]=useState( false ); 

    useEffect( () => {
        if(cadastro){
            setTitulo("");
            setDescricao("");
            setAno("");
            setDuracao("");
            setCategoria("");
            setImagem("");
        }

    },[cadastro]);

    function Cadastrar(evento){
        evento.preventDefault();
        fetch("http://10.139.75.32:8080/filmes" ,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao,
                    categoria: categoria,
                    imagem:imagem
                }
            )
        })
        .then( (resposta) => resposta.json() )
        .then( (json) => {
            if(json.titulo){
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


  return (
    <div>
       <Container component="section" maxWidth="xs">
        <Box sx={{mt: 20, borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography component="h1" variant="h4">Cadastre um filme</Typography>
            { cadastro && (<Alert severity="success">Você cadastrou o filme com sucesso</Alert>)}
            <Box component="form" onSubmit={Cadastrar}>
                <TextField 
                type="text"
                label="Título" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                />
                <TextField 
                type="text" 
                label="Descrição" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                />
                <TextField 
                type="number" 
                label="Ano" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                />
                <TextField 
                type="number" 
                label="Duração" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                />
                <Autocomplete
                    disableCloseOnSelect
                    id="combo-box-demo"
                    options={options}
                    renderInput={(params) => <TextField {...params} label="Categoria" />}
                    value={categoria}
                    onChange={ (event, opcao ) => {
                        setCategoria(opcao);
                      }}
                    sx={{ mt: 2, mb: 2 }}
                    fullWidth
                />
                <TextField 
                type="text" 
                label="Imagem" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                />
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
    </div>
  )
}

export default Movies
