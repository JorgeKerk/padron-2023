import React from 'react'
import logo from '../data/JPL.png'

const Card = ({card}) => {
  return (
    <div className='d-flex p-4 border rounded w-auto' style={{background: 'linear-gradient(309deg, rgba(74,187,233,1) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 70%, rgba(255,142,5,1) 100%)', fontSize: '10px'}}>
      <img src={logo} alt="Logo" width={90} className='border me-4' />
      <div className='w-100'>
        <div className='d-flex justify-content-between'>
          <h5 className='m-0 p-0' style={{fontSize: '12px'}}>{card.ApeyNom}</h5>
          <p className='m-0 p-0'><b>Documento: </b>{card.TipoDoc} {card.NroDoc}</p>
        </div>
        <p className='m-0 p-0'><b>Domicilio: </b>{card.Dom}</p>
        <p className='m-0 p-0'><b>Localidad: </b>{card.Depto}</p>
        <p className='m-0 p-0'><b>Escuela: </b>{card.Escuela}</p>
        <div className='d-flex gap-4 m-0 p-0'>
          <p className='m-0 p-0'><b>Mesa: </b>{card.Mesa}</p>
          <p className='m-0 p-0'><b>Orden: </b>{card.Orden}</p>
        </div>
      </div>
    </div>
  )
}

export default Card