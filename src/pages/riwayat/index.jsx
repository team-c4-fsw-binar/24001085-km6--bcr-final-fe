import { Row, Col, Container, Button, Modal, Image } from "react-bootstrap"
import { useState, React } from "react"
import { useNavigate } from "react-router-dom"

import { BsArrowLeft, BsFunnel } from "react-icons/bs"
import DetailPemesanan from "../../components/Riwayat/riwayat"
import PopupCard from "../../components/Riwayat/riwayatcari"
import Datepicker from "../../components/Riwayat/datepicker"
import findIcon from "../../assets/img/findIcon.svg"
const RiwayatPage = () => {
  const navigate = useNavigate()

  const [modalShowCari, setModalShowCari] = useState(false)
  const [modalShowDate, setModalShowDate] = useState(false)
  const BerandaClick = () => {
    // Mengarahkan ke halaman beranda
    navigate("/")
  }
  return (
    <>
      <Container>
        <Row>
          <h2 className="my-4">Riwayat Pemesanan</h2>
        </Row>
        <Row>
          <Col md={10} className="d-grid  ">
            <Button
              className="d-flex justify-content-left rounded-4 "
              style={{
                height: "50px",
                weight: "77px",
                backgroundColor: " #A06ECE",
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
              <Image src={findIcon} />
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
      </Container>
      <div
        className="m-4 mt-5 border "
        style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)" }}
      />
      {/* <div className="border shadow">
          <div className="border shadow"></div>
        </div>
      </div> */}
      <DetailPemesanan />
    </>
  )
}

export default RiwayatPage
