import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';

export default function PopupOrder(props) {

  


    setTimeout(()=> props.onHide(false), 3000)

    

    return (
        
    <Modal {...props} dialogClassName="modal-lg" centered   >
                           
        <Modal.Body className="p-5 text-center">
            <h1 className='text-success text-bold mb-5'>Yey.. Success Order</h1>
            <h4 className='text-success'>Thank your for ordering in us, please wait to verify you order</h4>
            
          
        </Modal.Body>
    </Modal>

    
    );
    
    
        
};


