import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import PopupOrder from '../Modal/PopupOrder';
import NavUser from '../Navbar/NavUser';
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import ModalDelete from '../Modal/ModalDelete';
const convertRupiah = require('rupiah-format')




export default function CartPage() {

    const navigate = useNavigate()
    

    const [modalPopupOrder, setModalPopupOrder] = useState(false)
    const [state, dispatch] = useContext(UserContext)
    const [orders, setOrders] = useState([])
    const [modalDelete, setModalDelete] = useState(false)
    const [idDelete, setIdDelete] = useState(null);
    const [deleteOrder, setDeleteOrder] = useState(null);
    const handleClose = () => setModalDelete(false);
    const handleShow = () => setModalDelete(true);

    const { id } = useParams()

    console.log(orders);

    

    const [form, setForm] = useState({
        
        status: "",
        attch_transaction: "",
        fullname: "",
        email: "",
        phone: "",
        poscode: "",
        address: "", 

    })


    const handleChange =(e) => {
        setForm({
            ...form,
            [e.target.name]: 
            e.target.type === "file" ? e.target.files : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers : {
                   "Content-type": "multipart/form-data",
                }
           }

           const formData = new FormData();
                formData.set("id_user", id  );
                formData.set("id_orders", JSON.stringify(idOrder));
                // formData.set("id_product", JSON.stringify(product));
                // formData.set("id_toppings", JSON.stringify(topping));
                formData.set("total_pay",  totalPay)
                formData.set("attch_transaction", form.image[0], form.image[0].name);
                formData.set("fullname", form.fullname);
                formData.set("email", form.email);
                formData.set("phone", form.phone);
                formData.set("poscode", form.poscode);
                formData.set("address", form.address);

                const idOrderCart = JSON.stringify(idOrder)

                // console.log(form);
                const response = await API.post(`/transaction/${id}`, formData, config)


                const deleteCartList = await API.delete(`/cart/${idOrderCart}`)


                setModalPopupOrder(true)

                


                // console.log(response);
                setTimeout(()=> navigate(`/user-profile/${id}`), 4000)

                 

            
        } catch (error) {
            console.log(error);
        }
    }


    // console.log(orders);
    

    // console.log(id);
    
    

    const getOrders = async () => {
        try {

            const response = await API.get(`/cart/${id}`)
            setOrders(response.data.data.orderList) 
            console.log(response.data.data) 

           
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
       return getOrders()
    }, [])


    const handleDelete = (id) => {
        console.log(id);
        setIdDelete(id)
        handleShow()
    }
    const deleteById = async (id) => {
        try {
            await API.delete(`/order-list/${id}`)
            getOrders()
            
            
        } catch (error) {
            console.log();
        }
    }
    useEffect(() => {

        
        if (deleteOrder) {

          handleClose();

          deleteById(idDelete);
          setDeleteOrder(null);
          
        }
      }, [deleteOrder]);

    
    const totalPay = orders.reduce((subTotal, element) => {
        return subTotal + element.sub_total
    }, 0)

    const idOrder = orders.map((idOrder) => idOrder.id)
    // console.log(idOrder);

    
    


  return (
    <>
    <NavUser />

      <div className='CartPage mb-5'>
        <Container>
            <Row>
                
                <h3 className='text-red text-bold mb-5'>My Cart</h3>
                <h4 className='text-red'>Review Your Order</h4>

                        {/* table card-list */}
                        
                        <Col lg={7}>
                            <hr className='horizline'/>
                            <div className='cart-list'>
                                {orders.length !== 0 ? (

                                    <>
                                        {orders.map((item) => (
                                            <div key={item.id} >

                                            <Row className=' align-items-center' >
                                            <Col  lg={2}>
                                                <img 
                                                    src={item.product.image}
                                                    alt={item.product.title}
                                                    style={{
                                                        width: "6rem",
                                                        height: "6rem",
                                                        objectFit: "cover",
                                                        borderRadius: "8px"
                                                    }}
                                                />
                            
                                            </Col  >
                                            <Col lg={7}>
                                                
                                                    <h5 className='text-bold text-red' >{item.product.title}</h5>
                                                    <p className='d-inline text-red  '>Toping :</p> 
                                                    {item.toppings.map(topping => <span className='d-inline text-red' key={topping.id}> {topping.title},</span> )}
                                                    
                                            </Col>
                                            <Col lg={3} className=' text-end'>
                            
                                                <h6 className=' text-red'> {convertRupiah.convert(item.sub_total)}</h6>
                                                <img 
                                                    src='../img/delete.svg'
                                                    width={16}
                                                    height={20}
                                                    alt='delete-img'
                                                    onClick={() => handleDelete(item.id)}
                                                    
                                                />  
                                            </Col>
                                                <hr className='horizline mt-3'/>

                                        </Row>
                                        </div>

                                             
                                        )
                                            
                                           
                                       
                                                
                                            
                                        )}
                                    </>

                                ) : (
                                    <div>
                                            <p>Tidak Ada Data</p>
                                    </div>
                                )}
                            

                            

                        </div>

                        {/*  End table card-list */}

                        <Row className='text-red align-items-center '>
                            <Col lg={6} className=''>

                                <hr className='horizline'/>

                                    <div className='d-flex justify-content-between'>
                                        <p>Sub Total</p>
                                        <p>{convertRupiah.convert(totalPay)}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Qty</p>
                                        <p>{orders.length}</p>
                                    </div>
                                <hr className='horizline'/>

                                    <div className='d-flex justify-content-between text-bold'>
                                        <p>Total</p>
                                        <p>{convertRupiah.convert(totalPay)}</p>
                                    </div>
                            </Col>

                            <Col lg={5} className='offset-lg-1' >
                               
                                <Card className='red-opacity outline-red text-center p-3  '>
                                    <Form>
                                        <Form.Label htmlFor='input-attache'>
                                            <Form.Control 
                                                id="input-attache"
                                                name="image"
                                                onChange={handleChange}
                                                className="red-opacity  p-2 mb-4 border-2 border-danger w-100 input-file "
                                                type="file" 
                                            />
                                            <img 
                                                src='../img/attache.svg'
                                                alt='attache-svg'
                                                width={43.75}
                                                height={50}
                                                className='m-auto mb-3'
                                            />
                                            <h6>Attache of Transaction</h6>
                                        </Form.Label>
                                        
                                    </Form>
                                    
                                </Card>
            


                                
                            </Col>
                            

                        </Row>
                        </Col >
                        
                        <Col lg={4} className='offset-lg-1'>
                            <Form>
                            <Form.Group>
                                <Form.Control
                                    className="red-opacity mb-4 p-2 border-2 border-danger"
                                    type="text"
                                    name="fullname"
                                    id="inputName"
                                    placeholder="Full Name"
                                    onChange={handleChange}

                                />  
                                                
                                <Form.Control
                                    className="red-opacity mb-4 p-2 border-2 border-danger"
                                    type="email"
                                    name="email"

                                    id="inputEmail"
                                    placeholder="Email"
                                    onChange={handleChange}

                                />
                                <Form.Control
                                    className="red-opacity  p-2 mb-4 border-2 border-danger"
                                    type="number"
                                    name="phone"

                                    id="inputPhone"
                                    placeholder="Phone"
                                    onChange={handleChange}

                                />
                                <Form.Control
                                    className="red-opacity  p-2 mb-4 border-2 border-danger"
                                    type="number"
                                    name="poscode"

                                    id="inputPosCode"
                                    placeholder="Pos Code"
                                    onChange={handleChange}

                                /> 
                                <Form.Control
                                    className="red-opacity  p-2 mb-4 border-2 border-danger"
                                    as="textarea"
                                    name="address"

                                    placeholder="Address"
                                    id="inputAddress"
                                    onChange={handleChange}

                                    style={{ height: '150px' }}
                                />

                                <Button onClick={handleSubmit} className="btn-red bg-red mb-3 w-100" variant="light" >Pay</Button>
                            </Form.Group>

                            
                            </Form>
                               

                        </Col>
                
            </Row>

           

            
            
        </Container>
        <PopupOrder show={modalPopupOrder} onHide={() => setModalPopupOrder(false)} />
            <ModalDelete show={modalDelete} setDeleteOrder={setDeleteOrder} handleClose={handleClose}/>

                             
        

      </div>
     </> 
  )
};

