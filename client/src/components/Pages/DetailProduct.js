
import React, { useState, useEffect, useContext } from 'react';

import { Container, Row, Col, Button} from "react-bootstrap";

import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import { API } from '../../config/api'
import TopingList from '../elements/TopingList';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom/cjs/react-dom.development';
import NavUser from '../Navbar/NavUser';
const convertRupiah = require('rupiah-format')

export const data = []


const DetailProduct = () => {

    const navigate = useNavigate()

    
    const  { id } = useParams()
    const [state, dispatch] = useContext(UserContext)
    const [total, setTotal] = useState([])
    const [user, setUser] = useState({})

    const getIdUser = async () => {
        try {

            const response = state.user

            setUser(response.id)
            console.log(response);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getIdUser()
    }, [])

    
    const [productData, setProductData] = useState([])
    const [toppingChecked, setToppingChecked] = useState([])
    // console.log(toppingChecked);

    
    
    const handleAddCart = async (e) => { 
        try {
            e.preventDefault()
     
                 const config = {
                     headers : {
                        "Content-type": "application/json",
                     }
                }

                const toppingsId = toppingChecked.map(item=> {
                    return (item.id)
                })
                // console.log(toppingsId);

                const data = {
                    id_user : user,
                    id_product : id,
                    id_toppings : toppingsId,
                    sub_total : total
                }

                const body = JSON.stringify(data);
                
                // console.log(body);
                
                
                const response = await API.post("/order-list", body, config  )
               

            
                navigate(`/cart-page/${user}`)
        } catch (error) {
            console.log(error);
        }
        
    }


   const handleClick = () => {
    const topping = data[0].filter(topping => topping.checked === true)
    setToppingChecked(topping)
    // console.log(topping);
    

        let priceToppings = topping.map(total => total.price)

    let totalPay = topping.reduce((priceTopping, element) => {
        return priceTopping + element.price
    }, 0)
    
    
    // console.log(priceToppings);
    // console.log(totalPay);

    setTotal(productData.price + totalPay)
    }  
    


    const getProduct = async () => {
        try {

            const response = await API.get(`/product/${id}`)

            setProductData(response.data.data.product)
            // console.log(response.data.data.product)
            setTotal(response.data.data.product.price)
            
            
        } catch (error) {
            console.log(error)
        }
    }

    

    const [toppings, setToppings] = useState([])

    // const handleChange = {
    //     setTotal()
    // }

    const getToppings = async () => {
        try {

            const response = await API.get("/toppings")

            setToppings(response.data.data.topping)
            // console.log(response.data)
            data.push(response.data.data.topping)
            
        } catch (error) {
            console.log(error)
        }
    }


    

    useEffect(() => {
        
        getToppings()
        return getProduct()
        
    },[])

    

  
    

  return (
      <>

        <NavUser />
       
      

          <Container className='DetailProduct mb-5 '>
            <Row className=''>
               
               
                     
                    <Col lg={5}>

                    <img 
                        src={productData.image}
                        alt={productData.title}
                        style={{
                            maxWidth: "24rem",
                            height :"32rem",
                            objectFit :"cover",
                            borderRadius: "16px"
                        }}
                        
                        
                        
                    />

                    </Col>


                    <Col lg={7}>
                    <h1  className="text-red text-bold mb-4">{productData.title}</h1>
                    <h4 className='mb-5 text-red'>{convertRupiah.convert(productData.price)}</h4>

                    <h5 className="text-red text-bold  " >Toping</h5>
                    <Row className='mb-5'>
                        {toppings.length !== 0 ? (
                            <>
                            {toppings.map((item, index) => (
                                <Col lg={3} className='text-center p-2'>
                                
                                  
                                    
                                        <div onClick={handleClick}>
                                            <TopingList item={item} id={item.id}   />   
                                        </div>
                                </Col>
                           

                            ))}
                            </>
                        ) : (
                        <>
                            <p>TOPING KOSONG</p>
                        </>
                        )}
                        
                        
                        
                    </Row>
                    <Row className='mb-5 '>
                        <Col lg={6}>
                            <h4 className='text-red text-bold'>Total </h4>
                        </Col>
                        <Col lg={6}>
                            <h4 className='text-red text-bold text-end'>{convertRupiah.convert(total)}</h4>

                        </Col>
                    </Row>
                    <Button className='btn-red bg-red w-100 mb-5' variant="light" onClick={handleAddCart}>Add Cart</Button>


                    </Col>


                  
                    
            </Row>      
          </Container>
          

     
      </>
   


  );
};

export default DetailProduct;
