
import React, { useContext, useState} from "react";
import {Modal, Form, Stack, Button, Alert} from "react-bootstrap"
import { UserContext } from "../../context/userContext";



//Api
import { API } from '../../config/api'

export default function ModalRegister(props) {

    const [state, dispatch] = useContext(UserContext)

    const [message, setMessage] = useState(null)

    
    const [form, setForm] = useState({
        fullname : "",
        email: "",
        password : "",
        
    })

    
    
    const { fullname, email, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        })
    }
    const  handleRegister = async (e) => {
       try {
           e.preventDefault()

            const config = {
                headers : {
                    "Content-type": "application/json"
                }
           }

           const body = JSON.stringify(form)

           const response = await API.post("/register" ,body, config)
           console.log(response.data);
           console.log(response.error);

        

           const alert = (
            <Alert variant="success">
                {response.data.status}
            </Alert>
        )
            
        
        setMessage(alert)
           
       } catch (error) {
           if(error){
             const alert = (
                <Alert variant="danger">
                    Account is Already
                </Alert>
            )
            
            setMessage(alert)
 
           } else {
               
           }
           
            const alert = (
                <Alert variant="danger">
                    {error.response.data.error.message} 
                </Alert>
            )
            
            setMessage(alert)
       }
    }

    

    console.log(props);
    return(
        <Modal {...props} dialogClassName="modal-md" centered   >
                           
                <Modal.Body className="p-5">
                    <h1 className="text-red text-bold  mb-5   ">Register</h1>
                    { message && message}
                    <Stack className="d-grid text-center mb-3 " gap={3}>
                        <Form.Group >
                            <Form.Control
                                required
                                className="red-opacity mb-4 p-3 border-2 border-danger"
                                name = "fullname"
                                onChange={handleChange}
                                type="text"
                                id="inputName"
                                placeholder="fullName"
                            />
                                
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control
                                className="red-opacity mb-4 p-3 border-2 border-danger"
                                name = "email"
                                onChange={handleChange}

                                type="email"
                                id="inputEmail"
                                placeholder="Email"
                            />
                            <Form.Control
                                className="red-opacity  p-3 mb-4 border-2 border-danger"
                                name = "password"
                                type="password"
                                onChange={handleChange}
                                id="inputPassword"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Password"
                            />
                             <Button onClick={handleRegister} className="btn-red bg-red btn-lg mb-3 w-100" variant="light" >Register</Button>
                        </Form.Group>

                       
                        <span className="text-bold">Already have an account ? Click   
                        <a onClick={props.handleSwitchLogin} href="#" className=" text-red text-bold "> Here</a>
                        </span>
                            
                        
                    </Stack>
                    
                </Modal.Body>
            </Modal>
    )
}
