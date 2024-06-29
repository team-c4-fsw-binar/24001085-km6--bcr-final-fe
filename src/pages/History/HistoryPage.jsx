import { Row, Col, Container, Button, Image } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { fetchBookings } from "../../redux/reducers/booking"
import { useDispatch, useSelector } from "react-redux"

import { BsArrowLeft, BsFunnel } from "react-icons/bs"
import "../styles/historyPage.css"
import MainComponent from "../../components/History/RiwayatCore"
import PopupCard from "../../components/Modal/searchHistory"
import Datepicker from "../../components/Modal/DatepickerModalHistory"
import RiwayatNotfound from "../../components/History/riwayatNotfound"
import * as icons from "../../assets/icons"
import Riwayatkosong from "../../components/History/riwayatkosong"

const HistoryPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [modalShowCari, setModalShowCari] = useState(false)
  const [modalShowDate, setModalShowDate] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [lastSearch, setLastSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const token = useSelector((state) => state.auth.token)
  const notFound = useSelector((state) => state.bookings.notFound)
  const empty = useSelector((state) => state.bookings.empty)

  // const formatDate = (date) => {
  //   return date.toISOString().split("T")[0]
  // }

  const handleSearchSubmit = (search) => {
    setLastSearch(search)
    setModalShowCari(false) // Close the modal after search
  }
  // const formatDatePick = (date) => {
  //   const d = new Date(date)
  //   let month = "" + (d.getMonth() + 1)
  //   let day = "" + d.getDate()
  //   const year = d.getFullYear()

  //   if (month.length < 2) month = "0" + month
  //   if (day.length < 2) day = "0" + day

  //   return [year, month, day].join("-")
  // }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "pad", day: "pad" }
    const date = new Date(dateString)

    // Year
    const year = date.getFullYear().toString()

    // Month (zero-padded for consistent format)
    const month = String(date.getMonth() + 1).padStart(2, "0")

    // Day (zero-padded for consistent format)
    const day = String(date.getDate()).padStart(2, "0")

    // Return formatted date string
    return `${year}-${month}-${day}`
  }
  const BerandaClick = () => {
    // Mengarahkan ke halaman beranda
    navigate("/")
  }
  useEffect(() => {
    dispatch(fetchBookings({ token, startDate, endDate, searchInput }))
  }, [dispatch, token, startDate, endDate, searchInput])
  return (
    <>
      <div className="shadow" style={{ height: "140px" }}>
        <div className="container mb-4">
          {" "}
          <Row>
            <h4 className="my-4" style={{ fontWeight: 700, fontSize: "20px" }}>
              Riwayat Pemesanan
            </h4>
          </Row>
          <Row className="">
            <Col md={10} sm={10} xs={10} className="container d-grid m-0">
              <Button
                className="beranda-button d-flex justify-content-left rounded-4 align-items-center mb-3 mt-0 "
                style={{
                  height: "44px",
                  weight: "77px",
                  alignContent: "center",
                  fontSize: "17px",
                  fontWeight: "700",
                }}
                onClick={BerandaClick}
              >
                <BsArrowLeft className="mx-2 my-1 align-bottom " />
                Beranda
              </Button>
            </Col>
            <Col
              md={1}
              sm={1}
              xs={1}
              className=" mb-2 d-flex justify-content-center align-items-center"
            >
              <Button
                variant="outline-dark"
                className="rounded-5 m-0"
                onClick={() => setModalShowDate(true)}
              >
                <BsFunnel />
              </Button>
            </Col>
            <Col
              md={1}
              sm={1}
              xs={1}
              className="d-grid d-flex justify-content-start aligns-items-center rounded-5 mb-2"
            >
              <Button
                variant="outline"
                className="rounded-3 m-0"
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
