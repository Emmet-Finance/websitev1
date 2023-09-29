// External imports
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
// SVGs
import Info from '../../assets/img/new/info.svg';
import Check from '../../assets/img/new/check.svg';
// Local imports
import { setSlippage } from '../state/transactions';

function SlippageTolerance() {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [slippageAmt, setSlippageAmt] = useState(0);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
  }

  const handleOnToleranceChange = (e) => {
    e.preventDefault();
    setSlippageAmt(e.target.value);
    dispatch(setSlippage(e.target.value));
  }

  const onSlippageClick = (data) => {
    dispatch(setSlippage(data));
  }

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
            <input
              type="radio"
              name='toleranceBox'
              id='toleranceBox1'
              onClick={() => onSlippageClick(0.1)}
            />
            <label htmlFor="toleranceBox1">0.1%</label>
            <input
              type="radio"
              name='toleranceBox'
              id='toleranceBox2'
              onClick={() => onSlippageClick(0.2)}
            />
            <label htmlFor="toleranceBox2">0.2%</label>
            <input
              type="radio"
              name='toleranceBox'
              id='toleranceBox3'
              onClick={() => onSlippageClick(0.5)}
            />
            <label htmlFor="toleranceBox3">0.5%</label>
            <input
              type="radio"
              name='toleranceBox'
              id='toleranceBox4'
              onClick={() => onSlippageClick(1.0)}
            />
            <label htmlFor="toleranceBox4">1.0%</label>
            <div className="toleranceBox">
              <input
                type="number"
                placeholder='0.5'
                value={slippageAmt ? slippageAmt : ''}
                onChange={handleOnToleranceChange}
              />
              <span>%</span>
            </div>
          </div>
          <div className="modalFooter">
            <Button
              className='cancelModal'
              onClick={handleClose}>
              CANCEL
            </Button>
            <Button
              className="SaveModal"
              onClick={handleClose}>
              Save <img src={Check} alt="Check" />
            </Button>
          </div>
        </Modal.Body>


      </Modal>
    </>
  );
}

export default SlippageTolerance;