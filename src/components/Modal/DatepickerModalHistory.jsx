import React from "react"
import DatePicker from "react-datepicker"
import { Button, Modal } from "react-bootstrap"
// import "react-datepicker/dist/react-datepicker.css"
// import "../styles/history/datepickerHistory.css"

const DatepickerModalHistory = ({
  show,
  onHide,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const handleClose = () => {
    // Save startDate and endDate before closing
    onHide(startDate, endDate)
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
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
          inline
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Simpan</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DatepickerModalHistory
