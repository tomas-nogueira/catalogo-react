import { Avatar, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./components/Header"
import './global.css'
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import CardF from "./components/CardF";
import Style from "./components/Styles/app.module.css"


function App(props) {

  const user = localStorage.getItem("usuario")
  const[produtos, setProdutos]=useState();
  const[erro, setErro]=useState();

  useEffect(() => {



    fetch(process.env.REACT_APP_BACKEND + "produtos/" + user,{
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then( (reposta) => reposta.json() )
    .then( (json) => {setProdutos(json) } )
    .catch( (erro) => { setErro( true )} )
    },[])
  
  function Excluir(evento, id ){
    evento.preventDefault();
    fetch(process.env.REACT_APP_BACKEND + "produtos" ,{
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {
            id: id,
            usuario: user
          }
      )
  })
  .then( (reposta) => reposta.json() )
  .then( (json) => {
          const novaLista = produtos.filter( (produtos) => produtos._id !== id);
          setProdutos( novaLista );
  } )
  .catch( (erro) => { setErro( true )} )
  }
    



  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <Container sx={{
        display:"flex",
        flexFlow:"row",
        flexWrap:"wrap",
        justifyContent:"space-around",
        gap: "2rem",
        mt:"5rem",
        mb:"5rem"
      }}>
        {produtos && (
          produtos.map((produto, index) => ( 
            <CardF
              img={produto.imagem}
              titulo={produto.titulo}
              descricao={produto.descricao}
              duracao={produto.duracao}
              ano={produto.ano}
              categoria={produto.categoria}
              excluir={(e) => Excluir(e, produto._id)}
              id={produto._id}
            />
        ))
      )}
        
      </Container>        
      <Footer></Footer>
    </>
  );
}
export default App;
