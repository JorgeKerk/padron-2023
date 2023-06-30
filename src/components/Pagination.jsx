import React, { useEffect, useState } from 'react'

const Pagination = ( {nEdit, dataFilter, changePage} ) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pages, setPages] = useState([])

  useEffect(()=>{
    const nPages = Math.ceil( dataFilter.length / 1000 )
    const arrayPages = []
    
    for( let i=1; i <= nPages; i++ ){
      arrayPages.push( i ) 
    }
    setPages( arrayPages )
    setCurrentPage(0)
    return changePage(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilter])

  const handleClick = (e)=> {
    const numPage = Number(e.target.value) 
    if(numPage!== currentPage){
      setCurrentPage(numPage)
      changePage(numPage*1000)
    }
  }
  
  return (
    <div>
      {
      pages &&
      pages.map( (p, ind) => 
        <button 
          type="button" 
          key={ind} 
          className={currentPage===ind? "btn btn-warning": "btn btn-primary"}
          value={ind}
          onClick={handleClick}
          disabled={nEdit !== -1}
        >
          {p}
        </button>
      )}
    </div>
  )
}

export default Pagination