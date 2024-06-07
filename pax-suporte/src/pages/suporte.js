import React from 'react'
import HeaderSuporte from '../components/header-suporte'
import './suporte.css'
import Imagem01 from '../assets/suporte.png'

const Suporte = () => {
  return (
    <div className="container-suporte">
      <HeaderSuporte />
      <div className="subcontainer-suporte">
        <img src={Imagem01}></img>
        <h1>Selecione uma opção do menu!</h1>
        </div>
    </div>
  )
}

export default Suporte
