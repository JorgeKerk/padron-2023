import React from 'react'

const Table = ({data, changeSelPrinter, changeSelEdit}) => {
  return (
    <table className="table my-5 py-5">
    <thead>
      <tr>
        <th scope="col">Documento</th>
        <th scope="col">Apellido y Nombre</th>
        <th scope="col">Domicilio</th>
        <th scope="col">Localidad</th>
        <th scope="col">Escuela</th>
        <th scope="col">Mesa</th>
        <th scope="col">Orden</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
    { data && data.map( (d, key) =>
      <tr className='fs-6' key={key}>
        {/* <th scope="row">1</th> */}
        <td>{d.TipoDoc} {d.NroDoc}</td>
        <td><b>{d.ApeyNom}</b></td>
        <td>{d.Dom}</td>
        <td>{d.Depto}</td>
        <td>{d.Escuela}</td>
        <td>{d.Mesa}</td>
        <td>{d.Orden}</td>
        <td>
          <div className='d-flex grid gap-2'>
            <button 
              type="button" 
              onClick={()=>changeSelEdit(key)}
              className={ d.editar? "btn btn-warning":"btn btn-primary"}
            >
              <i className="bi bi-chevron-double-down"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-light" 
              onClick={()=>changeSelPrinter(key)}
            >
              {d.imprimir
                ? <i className="bi bi-printer-fill"></i>
                : <i className="bi bi-printer"></i>
              }
            </button>
          </div>
        </td>
      </tr>
    )}
    </tbody>
  </table>
  )
}

export default Table