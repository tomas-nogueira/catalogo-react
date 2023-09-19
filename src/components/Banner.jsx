import React from 'react'
import Imagem from './photos/back.png'
import Style from './Styles/banner.module.css'
import Harry from './photos/Harry.png'

function Banner(props) {
  return (
    <div>
          <div className={Style.container}>
      <div className={Style.funko}>
        <img src={Harry} alt="" />
      </div>
      <div className={Style.maintext}>
        <p>"Funko Pop: Transformando paixões em coleções!"</p>
      </div>
    </div>
    <h2 className={Style.catalogo}>Catálogo</h2>
    </div>
  )
}

export default Banner
