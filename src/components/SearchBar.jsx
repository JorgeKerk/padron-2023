import React, { useEffect, useState } from 'react'

const SearchBar = ({nEdit, cities, handleFilters}) => {
  const [enable, setEnable] = useState(false)

  useEffect(()=>{
    setEnable(nEdit !== -1)
  }, [nEdit])

  const [filter, setFilter] = useState({
    NroDoc: '',
    ApeyNom: '',
    Depto: 'All',
    Printers: 'All'
  })

  const handleChange = (e)=> {
    const newFilter = {...filter, [e.target.name]: e.target.value}
    setFilter(newFilter)
    handleFilters(newFilter)
  }

  return (
    <div className='d-flex my-4 gap-2 justify-content-center align-items-center'>
      <label htmlFor="filters">Filtrar por</label>
      <input 
        className='DocSearch Inputs'
        type="text" 
        placeholder='Documento' 
        name='NroDoc' 
        value={filter.nroDoc} 
        onChange={handleChange}
        disabled={enable}
      />
      <input 
        className='ApeyNomSearch Inputs'
        type="text" 
        style={{"textTransform":"uppercase"}} 
        placeholder='Apellido y/o nombre' 
        name='ApeyNom' 
        value={filter.apeyNom} 
        onChange={handleChange}
        disabled={enable}
      />
      <select name="Depto" onChange={handleChange} disabled={enable} className='Inputs' >
        <option value='All' >Todas las localidades</option>
        {cities && cities.map( (c, ind) => <option value={c} key={ind}>{c}</option>)}
      </select>
      <select name="Printers" onChange={handleChange} disabled={enable} className='Inputs' >
        <option value='All' >Todas las personas</option>
        <option value='Only printer' >Personas a imprimir</option>
        <option value='Only not printer' >Personas sin imprimir</option>
      </select>
    </div>
  )
}

export default SearchBar