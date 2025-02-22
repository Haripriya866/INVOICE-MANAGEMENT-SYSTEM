import React, {useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import './index.css'

function UpdateInvoice(){
    const {id}=useParams();
    const navigate=useNavigate();
    const [invoiceNumber,setInvoiceNumber]=useState("");
    const [clientName,setClientName]=useState("");
    const [date,setDate]=useState("");
    const [amount,setAmount]=useState("");
    const [status,setStatus]=useState("Pending");
    
    const [invoiceNumberError, setInvoiceNumberError] = useState("");
    const [clientNameError,setClientNameError]=useState("");
    const [dateError,setDateError]=useState("");
    const [amountError,setAmountError]=useState("");
    const [statusError,setStatusError]=useState("");

     useEffect(()=>{
          const getData = async () => {
            const apiUrl='https://invoice-management-system-api.vercel.app/getupdate/'+id
            const response=await fetch(apiUrl)
            if(response.ok===true){
              const data=await response.json()
              const date = data.date ? new Date(data.date) : new Date();
              const formattedDate = date.toISOString().split("T")[0];
              setInvoiceNumber(data.invoiceNumber)
              setClientName(data.clientName)
              setDate(formattedDate)
              setAmount(data.amount)
              setStatus(data.status)
            }  
          }
          getData()
          
        },[])

    const onChangeInvoiceNumber=event=>{
        setInvoiceNumber(event.target.value)
    }
    const onChangeClientName=event=>{
        setClientName(event.target.value)
    }
    const onChangeDate=event=>{
        setDate(event.target.value)
    }
    const onChangeAmount=event=>{
        setAmount(event.target.value)
    }

    const onChangeStatus=event=>{
        setStatus(event.target.value)
    }


    const renderInvoiceNumber = () => {
        return (
            <div className='input-container'>
            <label htmlFor='invoice-number' className='label-element'>Invoice Number</label>
            <input
                type="text"
                id='invoice-number'
                placeholder="Invoice Number"
                value={invoiceNumber}
                onChange={onChangeInvoiceNumber}
                className="input-element"
            />
            {invoiceNumberError && <span className="error-msg">{invoiceNumberError}</span>}
        </div>
        );
    };

    const renderClientName = () => {
        return (
            <div className='input-container'>
                <label htmlFor='client-name' className='label-element'>Client Name</label>
                <input
                    type="text"
                    id='client-name'
                    placeholder="Client Name"
                    value={clientName}
                    onChange={onChangeClientName}
                    className="input-element"
                />
                {clientNameError && <span className="error-msg">{clientNameError}</span>}
            </div>
        );
    };

    const renderDate = () => {
        return (
            <div className='input-container'>
                <label htmlFor='date' className='label-element'>Date</label>
                <input
                    type="date"
                    id='date'
                    value={date}
                    onChange={onChangeDate}
                    className="input-element"
                />
                {dateError && <span className="error-msg">{dateError}</span>}
            </div>
        );
    };

    const renderAmount = () => {
        return (
            <div className='input-container'>
                <label htmlFor='amount' className='label-element'>Amount</label>
                <input
                    type="number"
                    id='amount'
                    placeholder="Amount"
                    value={amount}
                    onChange={onChangeAmount}
                    className="input-element"
                />
                {amountError && <span className="error-msg">{amountError}</span>}
            </div>
        );
    };
    const renderStatus=()=>{
        return(
            <div className='input-container'>
                <label htmlFor='status' className='label-element'>Status</label>
                <select
                id='status'
                    value={status}
                    onChange={onChangeStatus}
                    className="input-element"
                >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid" >Unpaid</option>
                    <option value="Pending">Pending</option>
                </select>
                {statusError && <span className="error-msg">{statusError}</span>}
            </div>
        )
    }

    const validateFields = () => {
        let isValid = true;
        
        setInvoiceNumberError("");
        setClientNameError("");
        setDateError("");
        setAmountError("");
        setStatusError("");
    
        if (!invoiceNumber) {
            setInvoiceNumberError("Invoice Number is required");
            isValid = false;
        }
        if (!clientName) {
            setClientNameError("Client Name is required");
            isValid = false;
        }
        if (!date) {
            setDateError("Date is required");
            isValid = false;
        }
        if (!amount) {
            setAmountError("Amount is required");
            isValid = false;
        }
        if (!status) {
            setStatusError("Status is required");
            isValid = false;
        }
    
        return isValid;
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const isValid = validateFields();
        if (!isValid) {
          return; // Stop submission if validation fails
        }
    
        const userDetails = { invoiceNumber,clientName,date,amount,status };
       
        const url="https://invoice-management-system-api.vercel.app/updateinvoice/"+id
        
        const options = {
            method:'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        };
    
        try {
            const response = await fetch(url, options);
            if (response.ok) {
              const data = await response.json();
              console.log("Invoice updated successfully:", data);
              navigate('/home')
            } else {
                  const errorData = await response.json();
                  console.error("Error updating invoice:", errorData);
            }
          } catch (error) {
              console.error("Network error:", error);
          }
      };

   
  return(
    <div className='main-container'>
        <div className='inner-container'>
            <form onSubmit={handleSubmit} className='form-container'>
                <h1 className='main-heading'>Update Invoice</h1>
                {renderInvoiceNumber()}
                {renderClientName()}
                {renderDate()}
                {renderAmount()}
                {renderStatus()} 
                <div className='button-container'>
                    <button type="submit" className='button'>Update</button>
                </div> 
            </form>
        </div>
    </div>
  )
}


export default UpdateInvoice;