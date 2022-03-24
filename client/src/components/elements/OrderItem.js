import React from 'react'
import { Row,Col } from 'react-bootstrap'

function OrderItem({item}) {

    console.log(item);

  return (
                <>
                        <Row className='my-3 align-items-center' >
                            <Col  lg={2}>
                                <img 
                                    src={item.product.image}
                                    alt={item.product.title}
                                   
                                />

                            </Col  >
                            <Col lg={7}>
                                <p>{item.toppings}</p>
                        
                            <h5 className='text-bold text-red' >{item.product.title}</h5>
                            <p className='d-inline text-red  '>Toping</p> 

                            
                                        <span className='d-inline text-red  '>: : -</span>     
                                  
                            
                    </Col>
                    <Col lg={3} className=' text-end'>

                        <h6 className=' text-red'> Rp.33.000</h6>
                        <img 
                            src='./img/delete.svg'
                            width={16}
                            height={20}
                            alt='delete-img'
                        />  
                    </Col>
                </Row>
            </>
  )
}

export default OrderItem