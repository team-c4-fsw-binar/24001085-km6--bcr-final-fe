import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"

const PageProtected = ({ children }) => {
  const navigate = useNavigate();
  const homeData = useSelector((state) => state.flights.homeData)

  useEffect(() => {
    if (!homeData) {
      navigate("/")
    }
  }, [homeData, navigate]);

  if (!homeData) {
    return null
  }

  return children;
}

PageProtected.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageProtected;