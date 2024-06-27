import React, { useState, useEffect } from "react"
import { Modal, Row, Form, Button, ListGroup } from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import "../styles/history/datepicker.css"
import { fetchBookings } from "../../redux/reducers/booking"
import { useDispatch, useSelector } from "react-redux"

const DatepickerModalHistory = ({
  show,
  onHide,
  onSubmitSearch,
  searchInput,
  setSearchInput,
}) => {
  const dispatch = useDispatch()
  const [searchHistory, setSearchHistory] = useState(["9Bsadhg"])
  const token = useSelector((state) => state.auth.token)

  const handleClearHistory = () => setSearchHistory([])

  const handleSearchSubmit = () => {
    if (searchInput) {
      const newHistory = [searchInput, ...searchHistory]
      setSearchHistory(newHistory)
      onSubmitSearch(searchInput)
    }
  }

  useEffect(() => {
    dispatch(fetchBookings({ token, searchInput }))
  }, [dispatch, token, searchInput])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearchSubmit()
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
            onKeyDown={handleKeyDown}
          />
        </Form.Group>
        <Row className=" m-0">
          <p className="col-md-9 mt-2 mb-0 d-flex align-items-start">
            Pencarian Terkini
          </p>{" "}
          <Button
            variant="link"
            onClick={handleClearHistory}
            className="col-md-6 d-flex justify-content-end"
            style={{ width: "100px", color: "red", height: "20px" }}
          >
            Hapus
          </Button>
        </Row>

        <ListGroup className="mt-3">
          {searchHistory.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
              onClick={() => setSearchInput(item)}
            >
              {item}
              <Button
                variant="light"
                onClick={(e) => {
                  e.stopPropagation()
                  const newHistory = searchHistory.filter((_, i) => i !== index)
                  setSearchHistory(newHistory)
                }}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  )
}

export default DatepickerModalHistory
