import { useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import * as images from "../../assets/images"

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const buttonStyle = {
    backgroundColor: hover ? '#5a2091' : '#7126b5',
    borderColor: hover ? '#5a2091' : '#7126b5',
    padding: '10px 20px',
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <Image src={images.emptyTicket} className="mt-5" />
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-4">
            Maaf, halaman yang Anda cari tidak ditemukan.
          </p>
          <Button 
            variant="primary" 
            onClick={() => navigate(-1)} 
            style={buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Kembali ke Halaman Sebelumnya
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;