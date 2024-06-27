import { Modal } from "react-bootstrap";
import SearchFlightsComponents from "../Home/SearchFlights";
import propTypes from "prop-types";

const SearchFlightsModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Cari Penerbangan</Modal.Title>
      </Modal.Header>

      <Modal.Body> 
        <SearchFlightsComponents />
      </Modal.Body>

    </Modal>
  )
}

SearchFlightsModal.propTypes = {
  show: propTypes.any,
  onHide: propTypes.any
};

export default SearchFlightsModal;