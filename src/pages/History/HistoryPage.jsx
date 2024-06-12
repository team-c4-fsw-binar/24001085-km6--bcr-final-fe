import { Row, Col, Container, Button, Image } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { BsArrowLeft, BsFunnel } from "react-icons/bs"
import "../styles/historyPage.css"
import DetailPemesanan from "../../components/History/riwayat"
import PopupCard from "../../components/Modal/SearchModal"
import Datepicker from "../../components/Modal/DatepickerModal"

import * as icons from "../../assets/icons"

const HistoryPage = () => {
  const navigate = useNavigate()

  const [modalShowCari, setModalShowCari] = useState(false)
  const [modalShowDate, setModalShowDate] = useState(false)
  const BerandaClick = () => {
    // Mengarahkan ke halaman beranda
    navigate("/")
  }
  return (
    <>
      <div className="shadow">
        <div className="container mb-4">
          {" "}
          <Row>
            <h2 className="my-4">Riwayat Pemesanan</h2>
          </Row>
          <Row>
            <Col md={10} className="d-grid  ">
              <Button
                className="beranda-button d-flex justify-content-left rounded-4 "
                style={{
                  height: "50px",
                  weight: "77px",

                  alignContent: "center",
                  fontSize: "23px",
                  fontWeight: "600",
                }}
                onClick={BerandaClick}
              >
                <BsArrowLeft className="mx-2 my-1 align-bottom " />
                Beranda
              </Button>
            </Col>
            <Col md={1} className="d-grid">
              <Button
                variant="outline-dark"
                className="rounded-5"
                onClick={() => setModalShowDate(true)}
              >
                <BsFunnel /> Filter
              </Button>
            </Col>
            <Col
              md={1}
              className="d-grid d-flex justify-content-center rounded-5"
            >
              <Button
                variant="outline"
                className="rounded-3"
                onClick={() => setModalShowCari(true)}
              >
                <Image src={icons.searchIcon} />
              </Button>
            </Col>
          </Row>
          <PopupCard
            show={modalShowCari}
            onHide={() => setModalShowCari(false)}
          />
          <Datepicker
            show={modalShowDate}
            onHide={() => setModalShowDate(false)}
          />
        </div>
      </div>

      <DetailPemesanan />
    </>
  )
}

export default HistoryPage
