import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import ModalTransaction from '../Modal/ModalTransaction';
import NavAdmin from '../Navbar/NavAdmin';
import { API } from '../../config/api';


const IncomeTransaction = () => {

    

    const [state,setState] = useState(false)
    const [transaction, setTransaction] = useState([])
    const [idTransaction, setIdTransaction] = useState(null);
    const [modalOrder, setModalOrder] = useState(false)
   
    const [idOrderItem, setIdOrderItem] = useState(null)

    
    console.log(idOrderItem);
    

     

    

    const getTransaction = async () => {
        try {
    
            const response = await API.get(`/transactions`)
            setTransaction(response.data.data.dataTransaction)

        } catch (error) {
            console.log(error);
            
        }
    }
    
    useEffect(()=>{
        getTransaction()
        return () => 
            setTransaction([])
        
    },[])

    

    
    

    const handleApprove = (id, status) => {
    //    setIdTransaction(id)
        status = "Waiting Delivery"
       updateById(id, status)   
       
        
    }
    const handleCancle = (id, status) => {
        //    setIdTransaction(id)
            status = "Cancel"
           updateById(id, status)   
           
            
        }
        const handleSend = (id, status) => {
            //    setIdTransaction(id)
                status = "On The Way"
               updateById(id, status)   
               
                
            }


    const updateById = async (id, status) => {
        try {
            
            
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
              };

            const dataUpdate = {
                status : status
            }
            const body = JSON.stringify(dataUpdate);
            console.log(id);
            const response = await API.patch(`/transaction/${id}`, body, config)
            console.log(response);
            getTransaction()
        } catch (error) {
            console.log(error);

            
        }
    }

    useEffect(() => {

        updateById(idTransaction)
       
        
      }, []);


      const handleModalOrder = (id) => {
        console.log(id);
        setIdOrderItem(id)
        setModalOrder(true)
    }

    
    



  return (

    <>
    <NavAdmin />
      <div className='IncomeTransaction mb-5'>

        <Container>
            <h1 className='text-bold text-red mb-5'>Income Transaction</h1>

            <Table  bordered >
                <thead  className='bg-light-grey text-bold '>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Post Code</th>
                        <th>Income</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {transaction.length !== 0 ?(
                    <>
                    {transaction.map((item, index) =>(
                         <tbody key={item.id}>
                         <tr>
                             <td>{index+1}</td>
                             <td>{item.fullname}</td>
                             <td>{item.address}</td>
                             <td >{item.poscode} </td>
                             <td onClick={()=> handleModalOrder(item.id)}>{item.total_pay}</td>
                            {modalOrder && <ModalTransaction show={modalOrder} onHide={()=>setModalOrder(false)} id={idOrderItem} />}

                             <td>
                                 {item.status === "Pending Accept" ? 
                                 (
                                    <span className='text-warning text-bold'>{item.status}</span>

                                 ) : item.status === "Waiting Delivery" ? 
                                 (
                                    <span className='text-warning text-bold'>{item.status}</span>

                                 ) : item.status === "On The Way" ? 
                                 (
                                    <span className='text-primary text-bold'>{item.status}</span>
                                    
                                 ) : item.status === "Success" ? 
                                 (
                                    <span className='text-success text-bold'>{item.status}</span>
                                 ) : 
                                 (
                                    <span className='text-danger text-bold'>{item.status}</span>

                                 )}
                                 
                            </td>
     
                             <td className='d-flex justify-content-center'>
                                 {item.status === "Pending Accept" ? (
                                    <>
                                      <Button variant='danger me-3 rounded-pill'  onClick={() => handleCancle(item.id)}>Cancel</Button>
                                      <Button variant="success rounded-pill" onClick={() => handleApprove(item.id)}>Approve</Button>
                                    </>
                                 ) : item.status === "Waiting Delivery" ? (
                                    <Button variant='primary me-3 rounded-pill'  onClick={() => handleSend(item.id)}>Send</Button>

                                 ) : item.status === "On The Way" ? (
                                     <img src='../img/delivery.png' style={{ width : "3rem", heigth : "3rem"}} />
                                 ) : item.status === "Success" ? (
                                    <img src='../img/check.svg' style={{ width : "2rem", heigth : "2rem"}} />

                                 ) : (
                                    <img src='../img/cancel.svg' style={{ width : "2rem", heigth : "2rem"}} />

                                 ) }
                                
     
     
                             </td>
     
                         </tr>

                     </tbody>
                     

                    ))}
                    </>
                ) : (

                    <tbody>
                    <tr>
                        <td>0</td>
                        <td>no data</td>
                        <td>no data</td>
                        <td >no data </td>
                        <td onClick={()=> setState(true)}>no data</td>
                        <td className='text-primary'>no data</td>

                        <td className='d-flex justify-content-center'>
                            <Button variant='danger me-3 rounded-pill '>Cancel</Button>
                            <Button variant="success rounded-pill">Approve</Button>


                        </td>

                    </tr>
                    
                   
                   

                </tbody>

                )

                }
                
            </Table>


        </Container>

      </div>
    </>
  );
};

export default IncomeTransaction;
