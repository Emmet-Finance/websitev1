import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Close from '../assets/img/new/close.svg';
import Info from '../assets/img/new/info.svg';
import Check from '../assets/img/new/check.svg';

function SlippageTolerance() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='changeSLip' onClick={handleShow}>
        Change
      </Button>

      <Modal className='SlipTolerModal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Slippage Tolerance  <img src={Info} alt="Info" />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="toleranceBtns">
            <input type="radio" name='toleranceBox' id='toleranceBox1' />
            <label htmlFor="toleranceBox1">0.1%</label>
            <input type="radio" name='toleranceBox' id='toleranceBox2' />
            <label htmlFor="toleranceBox2">0.5%</label>
            <input type="radio" name='toleranceBox' id='toleranceBox3' />
            <label htmlFor="toleranceBox3">0.10%</label>
            <input type="radio" name='toleranceBox' id='toleranceBox4' />
            <label htmlFor="toleranceBox4">0.15%</label>
            <div className="toleranceBox">
              <input type="number" placeholder='0.5' />
              <span>%</span>
            </div>
          </div>
          <div className="modalFooter">
            <Button className='cancelModal' onClick={handleClose}>
                CANCEL
            </Button> 
            <Button className="SaveModal" onClick={handleClose}>
                Save <img src={Check} alt="Check" />
            </Button>
          </div>
        </Modal.Body>
       
        
      </Modal>
    </>
  );
}

export default SlippageTolerance;