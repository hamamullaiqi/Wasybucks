import React, { useState, useContext, useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import '../css/ProductList.css'
import { Link } from "react-router-dom"
import ModalLogin from '../Modal/ModalLogin'
import ModalRegister from "../Modal/ModalRegister";
import CardProduct from "../elements/CardProduct";
import { UserContext } from "../../context/userContext";


//API 
import { API } from '../../config/api'

export default function ProductList() {
    
    
    const [state, dispatch] = useContext(UserContext)

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {

            const response = await API.get("/products")

            setProducts(response.data.data.products)
            // console.log(response.data.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
        return () => {
            setProducts({}); // This worked for me
          };
    }, [])


    

     
    

    
        
        return (
            <>
            <div className="product-list mb-5"   >
                <Container  > 
                    <h1 className="text-red text-bold mb-4">Let's Order</h1>
                    <Row  >
                       
                            {
                                // state.isLogin ? (
                                    products.length !== 0 ? (
                                <>
                                    {products.map((item) => (
                                        
                                        <Col lg={3}  key={item.id}>
                                            <div className="d-flex justify-content-start" >
                                                
                                                <CardProduct item={item}  />
                                            </div>
                                        </Col>
                                        
                                    ))}
                                </>
                                ) : (
                                <div > 
                                    PRODUCT NOT FOUND
                                </div>
                            )}    
                                
                        
                    </Row>

                    

                    
                   

                </Container>

                
                    
            </div>
            </>
        )
    }
