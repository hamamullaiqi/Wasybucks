import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form,Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import NavAdmin from '../Navbar/NavAdmin';

import { API } from '../../config/api'

const AddToping = () => {
    const navigate = useNavigate()

    const [dataTopping, setdataTopping] = useState([])
    const [preview, setPreview] = useState(null); 
    
    const { id } = useParams()
    
    const [form, setForm] = useState({
        title: "",
        price: "",
        image: ""
    })
    

    const getTopping = async (id) => {
        try {
            
            const response = await API.get(`/topping/${id}`)
            console.log(response.data.data)

            setPreview(response.data.data.topping.image)
            setForm({
                ...form,
                title: response.data.data.topping.title,
                price: response.data.data.topping.price,
            })
            
            setdataTopping(response.data.data)

           
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {    
        getTopping(id)

    },[])


    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
          }
        };


        const  handleSubmit = async (e) => {
            try {
                e.preventDefault()
     
                 const config = {
                     headers : {
                        "Content-type": "multipart/form-data",
                     }
                }
     
                const formData = new FormData();
                formData.set("title", form.title);
                formData.set("price", form.price);
               if (form.image) {
                    formData.set("image", form?.image[0], form?.image[0]?.name);
                  }
                
     
                const response = await API.patch(`/topping/${id}`, formData, config)
                console.log(response);
                
     
             
                
                navigate("/list-items")
                
            } catch (error) {
                console.log(error);
         }

        }
  return (
      <>
        <NavAdmin />

            <div className='UpdateToping mb-5'>
                <Container>
                
                    <Row >
                    
                        <Col lg={6} >
                        <h1 className='text-bold text-red mb-5' >Update Toping</h1>
                            <Form >
                            <Form.Group>
                                    <Form.Control
                                        name="title"
                                        onChange={handleChange}
                                        value={form.title}
                                        className="red-opacity mb-4 p-2 border-2 border-danger"
                                        type="text"
                                        id="inputNameToping"
                                        placeholder="Name Toping"
                                    />  
                                                    
                                    
                                    <Form.Control
                                        name="price"
                                        onChange={handleChange}
                                        value={form.price}

                                        className="red-opacity  p-2 mb-4 border-2 border-danger"
                                        type="number"
                                        id="inputPrice"
                                        placeholder="Price"
                                    />
                                    
                                        
                                    <Form.Label htmlFor='input-file' className='red-opacity  p-2 mb-5 rounded w-100 form-file '>
                                        <Form.Control 
                                            name="image"
                                            onChange={handleChange}
                                            id="input-file"
                                            className="red-opacity  p-2 mb-4 border-2 border-danger w-100 input-file"
                                            type="file" 
                                        />
                                        Photo Toping
                                        <span className='float-end  '>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#BD0707" class="bi bi-paperclip" viewBox="0 0 16 16" >
                                                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"></path>
                                            </svg>
                                        </span >
                                        </Form.Label>
                                        <Row className='justify-content-center'>
                                            <Col lg={10}>
                                                <Button onClick={handleSubmit} className="btn-red bg-red mb-3 w-100" variant='light' >Update Toping</Button>
                                            </Col>
                                        </Row>
                                    
                            </Form.Group>
                            </Form>
                        

                        </Col>
                        <Col lg={4} className='offset-lg-1'>

                            <img 

                                src={preview}
                                alt='topping'

                                style= {{
                                    width:"436px",
                                    height:"555px",
                                    objectFit : "cover",
                                    borderRadius : "32px"
                                }}
                                    
                            
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
  )
};

export default AddToping;
