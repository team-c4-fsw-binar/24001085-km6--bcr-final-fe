import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PageProtected = ({ childern }) => {
  const navigate = useNavigate()

  const homeData = useSelector((state) => state.flights.homeData)

  useEffect(() => {
    if (!homeData) {
      navigate("/")
    }
  },[])

  return childern
}

export default PageProtected