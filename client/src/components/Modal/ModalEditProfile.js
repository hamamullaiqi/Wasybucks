import React, { useEffect, useState } from 'react'
import {Modal, Form, Stack, Button, Col} from "react-bootstrap"

import { useParams } from 'react-router-dom'
import { API } from '../../config/api'


function ModalEditProfile(props) {

    const { id } = useParams()

    

    const [dataProfile, setDataProfile] = useState([])
    const [preview, setPreview] = useState(null); 


    const [form, setForm] = useState({
        fullname: "",
        email: "",
        image: ""
    })

    const getProfile = async () => {
        try {

            const response = await API.get(`/profile/${id}`)
            console.log(response.data.data);
            setPreview(response.data.data.dataProfile.image)

            setForm({
                ...form,
                fullname: response.data.data.dataProfile.user.fullname,
                email: response.data.data.dataProfile.user.email,
            })
            
            setDataProfile(response.data.data)

        } catch (error) {
            console.log(error);
        }

        
    }
    

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
    


    useEffect(() => {
        getProfile(id)
    }, [])


    const  handleSubmit = async (e) => {
        try {
            e.preventDefault()
 
             const config = {
                 headers : {
                    "Content-type": "multipart/form-data",
                 }
            }
 
            const formData = new FormData();
            formData.set("fullname", form.fullname);
            formData.set("email", form.email);
           if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
              }
            
 
            const response = await API.patch(`/user/${id}`, formData, config)
            console.log(response);
            
 
         
            
          
            
        } catch (error) {
            console.log(error);
     }

    }
    

  return (
    <div>
         <Modal show={props.show} onHide={props.onHide}  dialogClassName="modal-md" centered   >
            
            <Modal.Body className="p-5">
                <h1 className="text-red text-bold  mb-5   ">My Profile</h1>
                {/* {message && message} */}
                <Stack className="d-grid text-start mb-3 " gap={3}>
                <Col  >
                    <img 
                        src={preview}
                        alt=''
                        
                        style ={{
                            width: "12rem",
                            height: "12rem",
                            objectFit :"cover",
                            borderRadius: "8px",
                        
                        }}
                    />
                    
                </Col >
                    
                    <Form.Group >
                        <Form.Control
                            required
                            className="red-opacity mb-4 p-3 border-2 border-danger"
                            name = "fullname"
                            onChange={handleChange}
                            value={form.fullname}
                            type="text"
                            id="inputName"
                            placeholder="fullName"
                        />
                        
                        <Form.Control
                            className="red-opacity mb-4 p-3 border-2 border-danger"
                            type="email"
                            name="email"
                            id="inputEmail"
                            value={form.email}
                            placeholder="Email"
                            onChange={handleChange}
                        />

                        <Form.Label htmlFor='input-file' className='red-opacity  p-2 mb-5 rounded w-100 form-file '>
                            <Form.Control 
                                name="image"
                                onChange={handleChange}
                                
                                id="input-file"
                                className="red-opacity  p-2 mb-4 border-2 border-danger w-100 input-file"
                                type="file" 
                            />
                            Photo Profile
                            <span className='float-end  '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#BD0707" class="bi bi-paperclip" viewBox="0 0 16 16" >
                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"></path>
                                </svg>
                            </span >
                        </Form.Label>   
                        

                    <Button  className="btn-red bg-red btn-lg w-100 mb-3" variant="light" onClick={handleSubmit} >Save</Button>

                    </Form.Group>

                  
                        
                    
                </Stack>
                
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default ModalEditProfile