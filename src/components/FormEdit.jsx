import React, { useEffect, useState } from 'react'

const FormEdit = ({cities, schools, nEdit, data, confirmEdit}) => {
  const [enable, setEnable] = useState(false)
  const [formEsc, setFormEsc] = useState(false)

  const initialStatePerson = {
    doc: '',
    apeynom: '',
    dom: '',
    depto: '',
    esc: '',
    mesa: 0,
    ord: 0
  }
  const [personData, setPersonData] = useState(initialStatePerson)

  useEffect(()=>{
    setEnable(nEdit === -1)
    setFormEsc(false)
    let newPersonData
    if(nEdit !== -1){
      newPersonData = {
        doc: data[nEdit].NroDoc,
        apeynom: data[nEdit].ApeyNom,
        dom: data[nEdit].Dom,
        depto: data[nEdit].Depto,
        esc: data[nEdit].Escuela,
        mesa: data[nEdit].Mesa,
        ord: data[nEdit].Orden
      }
    } else {
      newPersonData = {...initialStatePerson}
    }
    setPersonData(newPersonData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, nEdit])

  const changeAcept = ()=>{
    data[nEdit].NroDoc = personData.doc
    data[nEdit].ApeyNom = personData.apeynom
    data[nEdit].Dom = personData.dom
    data[nEdit].Depto = personData.depto
    data[nEdit].Escuela = personData.esc
    data[nEdit].Mesa = personData.mesa
    data[nEdit].Orden = personData.ord
    data[nEdit].completo = true

    localStorage.removeItem(data[nEdit].id)
    localStorage.setItem(data[nEdit].id, JSON.stringify( data[nEdit] ))
    confirmEdit()
  }

  const changeData = (e)=> setPersonData({ ...personData, [e.target.name]: e.target.value});

  const changeFormEsc = ()=> {
    setFormEsc(!formEsc)
  }

  return (
    <form>
      <div className='d-flex flex-column'>
        <div className='d-flex'>
          <div className='d-flex flex-column'>
            <label htmlFor="Doc" className='fw-bold'>Documento</label>
            <input type="text" name="doc" value={personData.doc} onChange={changeData} disabled={enable}/>
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="ApeyNom" className='fw-bold'>Apellido y Nombre</label>
            <input type="text" name="apeynom"value={personData.apeynom} onChange={changeData} disabled={enable}/>
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="Dom" className='fw-bold'>Domicilio</label>
            <input type="text" name="dom" value={personData.dom} onChange={changeData} disabled={enable}/>
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="Depto" className='fw-bold'>Localidad</label>
            <select name="depto" id="cities" value={personData.depto} onChange={changeData} disabled={enable}>
            <option value={'Vacio'} ></option>
              {cities && cities.map( (c, ind) => <option value={c} key={ind}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className='d-flex'>
          <div className='d-flex flex-column'>
            <div>
              <label htmlFor="Esc" className='fw-bold'>Escuela</label>
              <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={changeFormEsc}
              disabled={enable}
              >{
                formEsc
                ? '≡'
                : '+'
              }</button>
            </div>
            { formEsc
              ? <input type="text" name="esc" value={personData.esc} onChange={changeData} disabled={enable}/>
              : <select name="esc" id="school" value={personData.esc} onChange={changeData} disabled={enable}>
                  <option value={'Vacio'} ></option>
                    {schools && schools.map( (s, ind) => <option value={s} key={ind}>{s}</option>)}
                </select>
            }
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="Mesa" className='fw-bold'>Mesa</label>
            <input type="number" name="mesa" value={personData.mesa} onChange={changeData} disabled={enable}/>
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="Ord" className='fw-bold'>Orden</label>
            <input type="number" name="ord" value={personData.ord} onChange={changeData} disabled={enable}/>
          </div>
          <button 
            type="button" 
            className="btn btn-warning" 
            onClick={changeAcept}
            disabled={enable}
          >
            Aceptar
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={confirmEdit}
            disabled={enable}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  )
}

export default FormEdit