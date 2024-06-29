import { Button, Image, Container, Modal } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import * as images from "../../assets/images"

const Riwayatkosong = () => {
  const navigate = useNavigate()

  const CariPenerbangan = () => {
    // Mengarahkan ke halaman beranda
    navigate("/")
  }
  return (
    <Container>
      <div className="text-center m-5 p-3">
        <Image src={images.finishedPage} className="mt-5" />
        <p
          className="mt-3 fw-medium"
          style={{ color: " #A06ECE", fontSize: "20px" }}
        >
          Oops! Riwayat pesanan kosong!
        </p>
        <p className="mb-3 fw-medium" style={{ fontSize: "20px" }}>
          Anda belum melakukan pemesanan penerbangan
        </p>
        <Button
          size="lg"
          style={{ backgroundColor: " #A06ECE" }}
          className="m-3"
          onClick={CariPenerbangan}
        >
          Cari Penerbangan
        </Button>
      </div>
    </Container>
  )
}

export default Riwayatkosong
