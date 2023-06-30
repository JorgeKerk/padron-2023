import React from 'react'
import Card from './Card';

const PrintCards = ({back, dataPrinters}) => {
  console.log(dataPrinters);
  return (
    <div>
      <button 
        type="button" 
        className="btn btn-warning" 
        onClick={back}
      >
        Volver
      </button>
      {dataPrinters.map( (dp, key) => <Card key={key} card={dp} />)}
    </div>
  )
}

export default PrintCards