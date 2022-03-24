
import React, { useContext, useState } from "react";
import {Modal, Form, Stack, Button, Alert} from "react-bootstrap"
import  PropTypes  from "prop-types";
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';


//Api
import { API } from '../../config/api'



export default function ModalLogin(props) {

    
    const [state, dispatch] = useContext(UserContext)
    // console.log(state);

    const [message, setMessage] = useState(null)
    

    const [form, setForm] = useState({
        email: "",
        password: "",
      });

      const { email, password } = form;


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        })
    }

    const  handleLogin = async (e) => {
       try {
           e.preventDefault()

           const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

           const body = JSON.stringify(form)

           const response = await API.post("/login" , body, config,)
        //    console.log(response.data.data.user);

           if (response?.status == 200) {
            // Send data to useContext
            setTimeout(()=> props.onHide(false), 1300);

                if(response.data.data.user.status === "admin") {
                    dispatch({
                        type: "ADMIN_LOGIN_SUCCESS",
                        payload: response.data.data.user,
                        });
                        
                    } else if (response.data.data.user.status === "customer") {
                        dispatch({
                            type: "LOGIN_SUCCESS",
                            payload: response.data.data.user,
                            });
            }
            const alert = (
                <Alert variant="success">
                    {response.data.status}
                </Alert>
            )
            setMessage(alert)
           
                
            } 

           
       } catch (error) {    
           console.log(error);
           const alert = (
            <Alert variant="danger">
                Email or Password Not match!
            </Alert>    
        )
        setMessage(alert)
       }
    }

     
    


    return(
        <>
            
            <Modal show={props.show} onHide={props.onHide}  dialogClassName="modal-md" centered   >
            
                <Modal.Body className="p-5">
                    <h1 className="text-red text-bold  mb-5   ">Login</h1>
                    {message && message}
                    <Stack className="d-grid text-center mb-3 " gap={3}>
                        
                        <Form.Group >
                            
                            <Form.Control
                                className="red-opacity mb-4 p-3 border-2 border-danger"
                                type="email"
                                name="email"
                                id="inputEmail"
                                value={email}
                                placeholder="Email"
                                onChange={handleChange}
                            />
                            <Form.Control
                                className="red-opacity  p-3 mb-4 border-2 border-danger"
                                type="password"
                                name="password"
                                id="inputPassword"
                                value={password}

                                aria-describedby="passwordHelpBlock"
                                placeholder="Password"
                                onChange={handleChange}

                            />

                        <Button onClick={handleLogin} className="btn-red bg-red btn-lg w-100 mb-3" variant="light" >Login</Button>

                        </Form.Group>

                        <span className="text-bold">Don't have an account ? Click      
                        <a onClick={props.handleSwitchRegister} href="#" className=" text-red text-bold "> Here</a>
                        </span>
                            
                        
                    </Stack>
                    
                </Modal.Body>
            </Modal>
        </>

        
                        
    )
    
    
}
ModalLogin.propTypes = {
    show : PropTypes.bool,
    onHide : PropTypes.func
}
