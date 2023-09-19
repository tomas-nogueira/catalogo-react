import React from 'react'
import Style from './Styles/headerlc.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CottageIcon from '@mui/icons-material/Cottage';

function HeaderLC() {
  return (
    <header className='headerlc'>
            <div className={Style.container}>
                <div className={Style.titulo}>
                    <h1>FUNKO POP</h1>
                </div>
                <div className={Style.fonts}>
                <a href='http://localhost:3000/login'><AccountCircleIcon className={Style.perfil}/></a>
                <a href='http://localhost:3000/'><CottageIcon className={Style.casa}/></a>
                </div>
            </div>
    </header>
  )
}

export default HeaderLC
