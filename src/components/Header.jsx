import React from 'react'
import Style from './Styles/header.module.css'

function Header(props) {
  return (
    <header className={Style.container}>
        <div className={Style.boxh1}>
            <h1>FUNKO POP</h1>
        </div>
        <div className={Style.boxmid}>
            <span>Em alta</span>
            <span>Redes Sociais</span>
        </div>
        <div className={Style.boxlogin}>
            <i class="fa-solid fa-user"></i>
            <div className={Style.boxloginm}>
                <a className={Style.ss} href='http://localhost:3000/login'>Entrar</a>
                <a href='http://localhost:3000/cadastro'>Cadastrar</a>
            </div>
        </div>
    </header>
  )
}

export default Header
