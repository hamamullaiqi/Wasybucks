import React, { useState, useEffect } from 'react';

import { Card,Row, Col,Badge } from 'react-bootstrap'
import { API } from '../../config/api';

const convertRupiah = require('rupiah-format')


function CardTransaction({transaction}) {
    console.log(transaction);

   
    const [idTransaction, setIdTransaction] = useState(null);




    const handleSuccess = (id, status) => {
        //    setIdTransaction(id)
            status = "Success"
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
            
        } catch (error) {
            console.log(error);
        }
    }


    

    useEffect(() => {
        
        updateById(idTransaction)

        


      }, []);

    
  return (
            <div>

                <Card className='red-opacity p-3 card-transaction text-red mb-3'>
                    <Row>
                        
                        {transaction.order_transaction.map(item => (
                            <Col lg={8} >
                            <Row className='p-2 '>
                                
                                <Col lg={3}>
                                    <img 
                                        src={item.order_lists.product.image}
                                        alt= {item.order_lists.product.title}
                                        style= {{
                                            width : "5rem",
                                            height : "7rem",
                                            objectFit : "cover",
                                            borderRadius : "4px"
                                        }}
                                        className="shadow-sm"
                                    
                                    
                                    />
                                </Col>
                                <Col lg={8} className='ms-1'>
                                    <h6 className='text-bold '>
                                        {item.order_lists.product.title}
                                    </h6>
                                    <p><span className='text-bold'>Saturday</span>, 5 March 2020</p>
                                
                                    <p className='d-inline-block text-bold '>Topping : </p>
                                        
                                       {item.order_lists.toppings.map(toppings =>  <span className='d-inline text-red'  key={toppings.id}> {toppings.title}, </span>) } 
                                    <div>
                                        <p className='text-bold mt-3 '> Price :
                                        
                                            <span > 
                                                {convertRupiah.convert(item.order_lists.sub_total)}  
                                            </span>
                                        </p>
                                    </div>
                                    
                                </Col>
                                

                            </Row>
                            


                        </Col>
                        ))}
                        
                        <Col lg={4} className='text-center '>
                                <div>
                                    <img 
                                        src='../img/logo.svg'
                                        alt='logo'
                                        width={60}
                                        className='mb-3'

                                        
                                    />
                                </div>
                                <div>
                                    <img 
                                        src='../img/barcode.png'
                                        alt='logo'
                                        width={74}
                                        className='mb-3'

                                        
                                    />
                                    
                                </div>
                                <div>
                                {transaction.status === "Pending Accept" ? 
                                 (
                                    <Badge bg="warning px-3 py-2 w-100 text-bold mb-3">
                                        {transaction.status}
                                    </Badge>

                                 ) : transaction.status === "Waiting Delivery" ? 
                                 (
                                    <Badge bg="warning px-3 py-2 w-100 text-bold mb-3">
                                        {transaction.status}
                                    </Badge>

                                 ) : transaction.status === "On The Way" ? 
                                 (
                                    <Badge onClick={() => handleSuccess(transaction.id)} bg="primary px-3 py-2 w-100 text-bold mb-3 btn">
                                        {transaction.status}
                                    </Badge>
                                    
                                 ) : transaction.status === "Success" ? 
                                 (
                                    <Badge bg="success px-3 py-2 w-100 text-bold mb-3">
                                        {transaction.status}
                                    </Badge>
                                    
                                 ) : 
                                 (
                                    <Badge bg="danger px-3 py-2 w-100 text-bold mb-3">
                                        {transaction.status}
                                    </Badge>

                                 )}
                                    
                                </div>
                                <div>
                                    <p className='text-bold'>Sub Total : </p>
                                        {convertRupiah.convert(transaction.total_pay)}  
                                    
                                </div>
                        </Col> 

                            

                    </Row>
                </Card>

            </div>
  )
}

export default CardTransaction