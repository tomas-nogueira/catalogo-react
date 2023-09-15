import React from 'react'
import Imagem from './photos/back.png'
import Style from './banner.module.css'

function Banner(props) {
  return (
    <>
        <div>
            <img src={Imagem} alt="Banner" />
        </div>
        <div className={Style.boxh2}>
            <h2 className={Style.h2}>Catálogo</h2>
        </div>
    </>
  )
}

export default Banner
