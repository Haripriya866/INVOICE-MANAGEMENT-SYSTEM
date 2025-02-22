import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'

import './index.css'

function Home(){
    const [invoices,setInvoices]=useState([])

    useEffect(()=>{
      const getData = async () => {
        const apiUrl='https://invoice-management-system-api.vercel.app/invoices'
        const response=await fetch(apiUrl)
        if(response.ok===true){
          const data=await response.json()
          setInvoices(data)
        }  
      }
      getData()
      
    },[])

    const handleDelete=async(id)=>{
      const deleteUrl='https://invoice-management-system-api.vercel.app/deleteinvoice/'+id
      const options = {
        method: "DELETE"
      };
      
      try {
        const response = await fetch(deleteUrl, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
  
          // Update state to remove deleted invoice
          setInvoices((prevInvoices) =>
            prevInvoices.filter((invoice) => invoice._id !== id)
          );
        } else {
          console.error("Failed to delete invoice");
        }
      } catch (error) {
        console.error("Error during deletion:", error);
      }
    }  
  return(
    <div className='create-invoice'>
      <div className='create-invoice-inner-container'>
        <Link to="/createinvoice">
          <button type='button' className='add-button'>
          Add+
          </button>
        </Link>
        <hr className='horizontal-line'/>
        <ul className='list-container'>
          <li className='list-header'>
            <span className='title'>Invoice Number</span>
            <span className='title'>Client Name</span>
            <span className='title'>Date</span>
            <span className='title'>Amount</span>
            <span className='title'>Status</span>
          </li>
          {invoices.map(invoice=>{
            const formattedDate = new Date(invoice.date).toISOString().split("T")[0];
          return(
            <li key={invoice._id} className='invoice-container'>
              <span className='invoice'>{invoice.invoiceNumber}</span>
              <span className='invoice'>{invoice.clientName}</span>
              <span className='invoice'>{formattedDate}</span>
              <span className='invoice'>{invoice.amount}</span>
              <span className='invoice'>{invoice.status}</span>
              <div className='right-content-container'>
              <Link to={`/update/${invoice._id}`}>
                      <button type='button' className='add-button'>
                      Update
                      </button>
                    </Link>
                      <button type='button' className='delete-button'
                      onClick={(e)=>handleDelete(invoice._id)}>
                      Delete
                      </button>
              </div>
            </li> 
          )
})
          }
        </ul>  
      </div>
    </div>
  )
}

export default Home;

