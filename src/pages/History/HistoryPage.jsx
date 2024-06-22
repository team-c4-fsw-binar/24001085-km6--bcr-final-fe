import { Row, Col, Container, Button, Image } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { BsArrowLeft, BsFunnel } from "react-icons/bs"
import "../styles/historyPage.css"
import MainComponent from "../../components/History/RiwayatCore"
import PopupCard from "../../components/Modal/searchHistory"
import Datepicker from "../../components/Modal/DatepickerModalHistory"

import * as icons from "../../assets/icons"

const HistoryPage = () => {
  const navigate = useNavigate()

  const [modalShowCari, setModalShowCari] = useState(false)
  const [modalShowDate, setModalShowDate] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [lastSearch, setLastSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  // const formatDate = (date) => {
  //   return date.toISOString().split("T")[0]
  // }

  const handleSearchSubmit = (search) => {
    setLastSearch(search)
    setModalShowCari(false) // Close the modal after search
  }
  const formatDate = (date) => {
    const d = new Date(date)
    let month = "" + (d.getMonth() + 1)
    let day = "" + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day

    return [year, month, day].join("-")
  }
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
            <h4 className="my-4" style={{ fontWeight: 700, fontSize: "20px" }}>
              Riwayat Pemesanan
            </h4>
          </Row>
          <Row className="p-2">
            <Col md={9} sm={7} xs={7} className="container d-grid">
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
            <Col md={2} sm={2} xs={2} className="d-grid">
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
              sm={2}
              xs={2}
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
            onSubmitSearch={handleSearchSubmit}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <Datepicker
            show={modalShowDate}
            onHide={() => setModalShowDate(false)}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>

      <MainComponent
        startDate={startDate ? formatDate(startDate) : ""}
        endDate={endDate ? formatDate(endDate) : ""}
        searchInput={searchInput}
      />
    </>
  )
}

export default HistoryPage
