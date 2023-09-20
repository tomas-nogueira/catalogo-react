import { Alert, Autocomplete, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import HeaderLC from './HeaderLC'
import Style from './Styles/cadastrofunko.module.css'


function Funkos() {

  const options = ['DC', 'Marvel', 'Games', 'Harry Potter', 'Outros'];
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


  function CadastroFunko(evento) {

    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "produtos",{
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
                imagem:imagem,
                usuario: localStorage.getItem("usuario")
            }
        )
    })
    .then( (resposta) => resposta.json() )
    .then( (json) => {
        if(json._id){
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
          <HeaderLC></HeaderLC>
         <Container component="section" maxWidth="xs" sx={{
            height:"45rem",
            backgroundColor:"#95C2FC",
            borderRadius:"30px",
            display:"flex",
            justifyContent:"center",
            mt:"4.5rem"
         }}>
          <Box sx={{ borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
              <h2 className={Style.h2main}>Cadastre um Funko</h2>
              { erro && (<Alert severity="warning">Erro, tente novamente por favor</Alert>)}
              { cadastro && (<Alert severity="success">Você cadastrou o funko com sucesso</Alert>)}
              <Box component="form" onSubmit={CadastroFunko}>
                  <TextField 
                  type="text"
                  label="Nome" 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  sx={{
                    backgroundColor:"white"
                }}
                  />
                  <TextField 
                  type="text" 
                  label="Descrição" 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  sx={{
                    backgroundColor:"white"
                }}
                  />
                  <TextField 
                  type="number" 
                  label="Ano" 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  sx={{
                    backgroundColor:"white"
                }}
                  />
                  <TextField 
                  type="number" 
                  label="Valor" 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth
                  value={duracao}
                  onChange={(e) => setDuracao(e.target.value)}
                  sx={{
                    backgroundColor:"white"
                }}
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
                      sx={{ mt: 2, mb: 2,
                    backgroundColor:"white"
                    }}
                  />
                  <TextField 
                  type="text" 
                  label="Imagem" 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth
                  value={imagem}
                  onChange={(e) => setImagem(e.target.value)}
                  sx={{
                    backgroundColor:"white"
                }}
                  />
                  <Button variant="contained" type="submit" fullWidth sx={{mt: 2, mb: 2}}>Enviar</Button> 
                  <Grid container>
                      <Grid item xs sx={{
                        color:"white",
                        fontSize:"1.2rem"
                      }}>
                          Esqueci a Senha
                      </Grid>
                      <a href='./cadastro' className={Style.cc}>
                          Cadastrar usuário
                      </a>
                  </Grid>
              </Box>
          </Box>
        </Container>
      </div>
    )



}


export default Funkos
