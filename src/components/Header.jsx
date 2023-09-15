import React from 'react'
import Style from './header.module.css'

function Header() {
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
                <a className={Style.ss}>Entrar</a>
                <a>Cadastrar</a>
            </div>
        </div>
    </header>
  )
}

export default Header
