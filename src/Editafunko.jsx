import { Box, Container, TextField, Typography, Button, Autocomplete, Alert} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import HeaderLC from './components/HeaderLC';
import Footer from './components/Footer';
import Style from './components/Styles/editafunko.module.css'

function Editafilme() {
  


    const {id} = useParams(); // Desestruturação de objeto, dentro do parâmetro tem várias infomações, porém esse objeto só se usa o id


    const options = ['DC', 'Marvel', 'Games', 'Harry Potter', 'Outros'];
    const [titulo, setTitulo]=useState("");
    const [descricao, setDescricao]=useState("");
    const [ano, setAno]=useState("");
    const [duracao, setDuracao]=useState("");
    const [categoria, setCategoria]=useState("");
    const [imagem, setImagem]=useState("");
    const [erro, setErro]=useState( false );
    const [editar, setEditar]=useState(false)
  
    useEffect(()=>{

        const usuario= localStorage.getItem("usuario");

        fetch(process.env.REACT_APP_BACKEND + "produtos/"+ usuario + "/" + id,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then( (resposta) => resposta.json() )
        .then( (json) => {
            if( !json.status ){
                setTitulo(json.titulo);
                setCategoria(json.categoria);
                setDescricao(json.descricao);
                setDuracao(json.duracao);
                setImagem(json.imagem);
                setAno(json.ano);
            }
            else{
                setErro("Funko não encontrado")
            }
        } )
        .catch( (erro) => { setErro( true )} )
    },[])

    function Editar( evento ){
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id,
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
                setEditar( true );
                setErro( false );
            }
            else{
                setErro( true );
                setEditar( false );
            }
        } )
        .catch( (erro) => { setErro( true )} )
    }
  
    return (
    <div>
        <HeaderLC></HeaderLC>
      <Container component="section" maxWidth="xs" sx={{
            height:"44rem",
            backgroundColor:"#95C2FC",
            borderRadius:"30px",
            display:"flex",
            justifyContent:"center",
            mt:"5rem"
      }}>
        <Box sx={{ borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h2 className={Style.edit}>Editar Funko</h2>
        {editar && (<Alert severity='success'>Funko editado com sucesso</Alert>)}
        {erro && (<Alert severity='warning'>{erro}</Alert>)}
            <Box component="form" onSubmit={Editar}>
            <TextField 
                type="text"
                label="Título" 
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
                label="Duração" 
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
                sx={{ mt: 2, mb: 2, backgroundColor:"white"}}
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
                sx={{
                    backgroundColor:"white"
                }}
                />
                <Button variant="contained" type="submit" fullWidth size='large' sx={{mt: 2, mb: 2}}>Editar</Button> 
            </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Editafilme
