import { useEffect, useState } from 'react';
import './App.css';
import dataInit from './data/Padron2023.json'
import { FormEdit, Pagination, PrintCards, SearchBar, Table } from './components';

function App() {
  const [data, setData] = useState();
  const [dataFilter, setDataFilter] = useState();
  const [dataPrinters, setDataPrinters] = useState();
  const [originalData, setOriginalData] = useState();
  const [chargeData, setChargeData] = useState(false)
  const [print, setPrint] = useState(false)
  const[countPrinters, setCountPrinters] = useState(0)
  const [cities, setCities] = useState([])
  const [schools, setScools] = useState([])
  const [nEdit, setNEdit] = useState(-1)

  const changeSelPrinter = (ind)=> {
    const newData = [...data]
    newData[ind].imprimir = !newData[ind].imprimir
    setCountPrinters( countPrinters => newData[ind].imprimir? countPrinters = countPrinters + 1: countPrinters = countPrinters - 1 )
    setData(newData)
  }

  const changeSelEdit = (ind)=> {
    if(nEdit===-1){
      const newData = [...data]
      newData[ind].editar = !newData[ind].editar
      setNEdit(ind)
      setData(newData)
    }
  }

  const confirmEdit = ()=>{
    const newData = [...data]
    newData[nEdit].editar = !newData[nEdit].editar
    if(newData[nEdit].Escuela !== 'N/N'){
      let newSchools = newData.filter( d => d.Escuela !== 'N/N').map( ch => ch.Escuela)
      newSchools = [ ...new Set(newSchools.sort())]
      setScools(newSchools)
    }
    setData(newData)
    setNEdit(-1)
  }

  useEffect(()=>{
    if(!chargeData) {
      setChargeData(true)

      const changeData = dataInit.map( (d, ind) => {
        const dataStorage = JSON.parse( localStorage.getItem( ind ) )
        if(dataStorage)
        console.log( 'STORAGE: ', ind, dataStorage);
        return dataStorage ? {...dataStorage, completo: false, editar: false, imprimir: false}: {...d, id: ind, completo: false, editar: false, imprimir: false}
      });

      setDataFilter(changeData)
      setData(changeData.slice(0,1000))
      setOriginalData(changeData)
      let newCities = changeData.map( ch => ch.Depto)
      newCities = [ ...new Set(newCities.sort())]
      setCities(newCities)
      let newSchools = changeData.filter( d => d.Escuela !== 'N/N').map( ch => ch.Escuela)
      newSchools = [ ...new Set(newSchools.sort())]
      setScools(newSchools)
    }
  },[chargeData])

  const handleFilters = (filters)=>{
    let newFilters = originalData

    if(filters.NroDoc) newFilters = newFilters.filter( d => d.NroDoc.toString().includes(filters.NroDoc) )
    if(filters.ApeyNom && newFilters.length) newFilters = newFilters.filter( d => d.ApeyNom.includes(filters.ApeyNom.toUpperCase()) )
    if(filters.Depto !== 'All' && newFilters.length) newFilters = newFilters.filter( d => d.Depto === filters.Depto )
    if(filters.Printers !== 'All' && newFilters.length) newFilters = newFilters.filter( d => d.imprimir === (filters.Printers === 'Only printer') )
    setDataFilter(newFilters)
    setData(newFilters.slice(0,1000))
  }

  const changePage = (page)=> setData(dataFilter.slice( page, page+1000)) 

  const handlePrintTarjets = ()=>{
    setDataPrinters( originalData.filter( d => d.imprimir ) )
    setPrint(true)
  }

  return (
    <div className='app'>
      { print
        ? <PrintCards back={()=>setPrint(false)} dataPrinters={dataPrinters} />
        : <div className='py-1 text-center widthCss'>
            <div className='py-4 header bg-white widthCss'>
              <h1 className='display-5 fw-bold'>Padron 2023</h1>
              <SearchBar nEdit={nEdit} cities={cities} handleFilters={handleFilters} />
              <FormEdit cities={cities} schools={schools} nEdit={nEdit} data={data} confirmEdit={confirmEdit}/>
              {dataFilter && <Pagination nEdit={nEdit} dataFilter={dataFilter} changePage={changePage} />}
              <button 
                type="button" 
                className="btn btn-warning" 
                disabled={countPrinters === 0 || nEdit !== -1}
                onClick={handlePrintTarjets}
              >
                Imprimir targetas
              </button>
            </div>
            <div className='table widthCss'>
              <Table data={data} changeSelPrinter={changeSelPrinter} changeSelEdit={changeSelEdit} />
            </div>
          </div>
      }
      {/* <h1>Hola !!!!</h1> */}
    </div>
  );
}

export default App;
