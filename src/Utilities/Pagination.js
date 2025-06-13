import { useEffect, useState } from "react"
export const limit=5
export default function Pagination({currentPage,  setCurrentPage, totalPages}){
    const [pageArray,setPageArray]=useState([]) 
    useEffect(()=>{
        getTotalPages()
    },[totalPages])
    const getTotalPages=()=>{
        let array=[]
        for(let i=1;i<=totalPages;i++){
            array.push(i)         
        }
        setPageArray(array)
    }
    return(
        <>
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={currentPage==1?"page-item disabled":"page-item"  }><a className="page-link" href="#"
                    onClick={()=>{
                    setCurrentPage(currentPage-1)
                }}>Previous</a></li>
                {pageArray?.map((pageno,index)=>(
                    <li className={pageno==currentPage?"page-item active": "page-item"} key={index}><a className="page-link" onClick={()=>{setCurrentPage(pageno)}}  href="#">{pageno}</a></li>
                ))}
                <li className={
                    pageArray[pageArray.length-1]===currentPage?"page-item disabled":"page-item"
                }>
                <a className="page-link" href="#"
                    onClick={()=>{
                    setCurrentPage(currentPage+1)
                }}>Next</a></li>
            </ul>
        </nav>
        </>
    )
}