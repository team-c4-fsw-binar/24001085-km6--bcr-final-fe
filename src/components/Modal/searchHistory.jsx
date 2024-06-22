import React, { useState } from "react"
import { Modal, Form, Button, ListGroup } from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import "../styles/history/datepicker.css"

const DatepickerModalHistory = ({
  show,
  onHide,
  onSubmitSearch,
  searchInput,
  setSearchInput,
}) => {
  const [searchHistory, setSearchHistory] = useState(["9Bsad"])

  const handleClearHistory = () => setSearchHistory([])

  const handleSearchSubmit = () => {
    if (searchInput) {
      const newHistory = [searchInput, ...searchHistory]
      setSearchHistory(newHistory)
      onSubmitSearch(searchInput) // Mengirim hasil pencarian ke komponen induk
      setSearchInput("") // Mengosongkan input setelah submit
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form.Group className="d-flex">
          <Form.Control
            type="text"
            placeholder="Cari Code Booking"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="primary" onClick={handleSearchSubmit}>
            Submit
          </Button>
        </Form.Group>
        <ListGroup className="mt-3">
          {searchHistory.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {item}
              <Button
                variant="light"
                onClick={() => {
                  const newHistory = searchHistory.filter((_, i) => i !== index)
                  setSearchHistory(newHistory)
                }}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button
          variant="link"
          onClick={handleClearHistory}
          className="text-danger mt-2"
        >
          Hapus
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default DatepickerModalHistory
