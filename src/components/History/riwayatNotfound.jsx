import { Button, Image, Container, Modal } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import * as images from "../../assets/images"

const Riwayatkosong = ({ show, onClick }) => {
  return (
    <Container>
      <div className="text-center m-5 p-3">
        <Image src={images.finishedPage} className="mt-5" />
        <p
          className="mt-3 fw-medium"
          style={{ color: " #A06ECE", fontSize: "20px" }}
        >
          Oops! Riwayat pesanan Tidak Ditemukan!
        </p>
        <p className="mb-3 fw-medium" style={{ fontSize: "20px" }}>
          Silahkan Coba Code atau Tanggal pencarian yang lain
        </p>
      </div>
    </Container>
  )
}

export default Riwayatkosong
