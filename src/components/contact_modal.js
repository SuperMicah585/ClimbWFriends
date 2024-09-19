import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap';
import { useEffect, useState } from 'react';



const ContactModal = ({showContactModal}) => {
 
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);

/*
    useEffect(() => {
        if(climbsArray.length>0){
        setShow(true)
        }
    }, [climbsArray,showClimbModal]);

*/

useEffect(() => {
    if(showContactModal>0){
    setShow(true)
    }
   
}, [showContactModal]);

    const labelStyle = {

        color: '#cc5500',
      
      };

      const titleStyle = {

        color: '#048c7f',
      
      };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal onHide={handleClose} style = {{fontFamily: 'Comic Sans MS'}}show = {show}>
        <Modal.Header>
          <Modal.Title style = {titleStyle} >Contact</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h3>For questions/requests you can email me at <span style = {labelStyle}>micahphlps@gmail.com</span></h3>
 
        </Modal.Body>

        <Modal.Footer>
          <Button onClick = {handleClose} size= 'sm' variant="outline-secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContactModal;