import React from 'react'
import { Modal, Button,  } from 'react-bootstrap'

function ModalDelete(props) {
  return (
    <div>
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-bold text-red'>WARNING!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah yakin ingin menghapus?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={props.setDeleteOrder}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalDelete