import React,{ useContext, useEffect, useState} from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ModalLogin from '../Modal/ModalLogin'
import { UserContext } from '../../context/userContext'

const convertRupiah = require('rupiah-format')


const CardProduct = ({item}) => {
  
  const id = item.id

  const navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)

  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false);
    

    const handleSwitchRegister = () => {
        setModalRegister(true)
        return(setModalLogin(false))
     }
     const handleSwitchLogin = () => {
        setModalLogin(true)
        return(setModalRegister(false))
     }


     const handleClick = () => {
       if(!state.isLogin){
         setModalLogin(!modalLogin)
       } else {
         navigate(`/detail-product/${id}`)
       }
     }


     


  return (
    <>
    
        <ModalLogin show={modalLogin} onHide={() => setModalLogin(!modalLogin)} handleSwitchRegister={handleSwitchRegister}  />
        <Card className='my-3 shadow-sm' style={{ width: '16rem' }} onClick={handleClick}  >
                                                                          
          <Card.Img variant="top" className='image-card' src={item.image} alt={item.name} />
          
            
              <Card.Body className="red-opacity">
                  <Card.Title className="text-red text-bold">{item.title}</Card.Title>
                  <Card.Text> 
                  {convertRupiah.convert(item.price)}
                  </Card.Text>
              </Card.Body>

        </Card>

    </>
      
    
  )
}

export default CardProduct