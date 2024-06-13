import { useState } from "react";
import DatePicker from "react-datepicker";
import { Button, Modal } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

import "../styles/history/datepicker.css";

const datepicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Modal
      {...props}
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
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          minDate={new Date()}
          inline
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default datepicker;
