
    import React,{useState,useEffect} from "react";
    import {Modal, Col, Row, Badge, Card} from "react-bootstrap"
    import { API } from '../../config/api';

    const convertRupiah = require('rupiah-format')


    export default function Transaction(props) {


        const [orderItem, setOrderItem] = useState([])

        console.log(orderItem);
        console.log(props.id);


        const getOrderItem = async (id) => {
            try {
                
                const response = await API.get(`/transaction-user/${id}`)
                setOrderItem(response.data.data.dataTransaction)
                console.log(response.data.data)

                

            } catch (error) {
                console.log(error);
                
            }
        }
        useEffect(() => {
            console.log(props.id);
            getOrderItem(props.id)
        
            
        }, []);
        
        return(
            <Modal show={props.show} onHide={props.onHide} dialogClassName="modal-lg" centered  >
                            
                        <Modal.Body className="card-transaction red-opacity rounded" >
                            <Row>
                            {orderItem.map((item) => (
                                <>
                                {item.order_transaction.map((orderItem) => (
                                    
                                    <Col lg={8} >
                                    <Row className='p-2 '>
                                        <Col lg={3}>
                                            <img 
                                                src={orderItem.order_lists.product.image}
                                                alt={orderItem.order_lists.product.title}
                                                width={80}
                                                height={97}
                                            
                                            
                                            />
                                        </Col>
                                        <Col className='ms-3'>
                                            <h6 className='text-bold '>{orderItem.order_lists.product.title}</h6>
                                            <p><span className='text-bold'>Saturday</span>, 5 March 2020</p>
                                            <p className='d-inline-block text-bold   '>Toping</p>
                                            

                                                {orderItem.order_lists.toppings.map(toppings =>  <span className='d-inline text-red '  key={toppings.id}> {toppings.title}, </span>) } 

                                            
                                            <p className='text-bold mt-3'>Price : 
                                            
                                            <span > {convertRupiah.convert(orderItem.order_lists.sub_total)} </span>
                                            </p>
                                        </Col>
                                        
                                    </Row>
                                    
        
        
                                    </Col>
                                ))}
                            

                                <Col lg={4} className='text-center '>
                                <div>
                                    <img 
                                        src='./img/logo.svg'
                                        alt='logo'
                                        width={60}
                                        className='mb-3'

                                        
                                    />
                                </div>
                                <div>
                                    <img 
                                        src='./img/barcode.png'
                                        alt='logo'
                                        width={74}
                                        className='mb-3'

                                        
                                    />
                                    
                                </div>
                                <div>
                                    <Badge bg="info px-3 py-2 w-100 text-bold mb-3">
                                        {item.status}
                                    </Badge>
                                </div>
                                <div>
                                    <p className='text-bold'>Sub Total : </p>
                                    {convertRupiah.convert(item.total_pay)}  

                                </div>
                                </Col>
                                </>
                            ))}                
                            
                            
                                
                            </Row>

                        
                                    
                                
                                </Modal.Body>
                            </Modal>
                            
        )
        
    }
