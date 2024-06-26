import * as icons from "../../assets/icons"
import * as images from "../../assets/images"
import Navbar from "../../components/Navigation/Navbar"
import { Image } from "react-bootstrap"

const styles = {
    fontTitleMedium16: { fontWeight: 500, fontSize: '16px' },
    fontBodyBold14: { fontWeight: 700, fontSize: '14px' },
    fontHeadingBold24: { fontWeight: 700, fontSize: '24px' },

    // Purple text
    textKedatangan: { color: '#A06ECE' },
    textTotal: { color: '#7126B5' },
}

const ServicePage = () => {
    return (
        <>
            <Navbar />
            <center className="mt-5">
                <Image src={images.emptyTicket} className=""></Image>
                <div className="mt-5">
                    <p style={{ ...styles.fontHeadingBold24, ...styles.textTotal }}>FITUR MASIH DALAM PENGEMBANGAN</p>
                    <p style={{ ...styles.fontTitleMedium16, ...styles.textKedatangan }}>Eitss, Jangan Khawatir!<br /> 
                    Saat ini Booking Langsung Pulang - Pergi tetap dapat dilakukan dari Aplikasi  
                    <span style={{ ...styles.fontBodyBold14, ...styles.textTotal }}> TERBANGAJA</span></p>
                </div>
            </center>
        </>
    );
};

export default ServicePage;