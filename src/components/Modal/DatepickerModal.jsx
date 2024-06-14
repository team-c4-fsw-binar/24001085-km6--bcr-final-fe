import { useState } from "react";
import DatePicker from "react-datepicker";
import { Button, Modal } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

import "../styles/history/datepicker.css";

const datepicker = ({ startDate, endDate, setStartDate, setEndDate, toggleSwitch, show, onHide }) => {
  const onChangeReturn = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onChange = (dates) => {
    const start = dates;
    setStartDate(start);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="medium"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Date Filter
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          toggleSwitch ? (<DatePicker
            selected={startDate}
            onChange={onChangeReturn}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            inline
          />) : (
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              minDate={new Date()}
              inline
            />
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default datepicker;
