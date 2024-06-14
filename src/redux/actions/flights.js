import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { setFlights } from "../reducers/flight"

// Fetch all flights
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/flights`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE3MzMxNDQxLCJleHAiOjE3MTczMzg2NDF9.zowQ-u1HgkeVEynSA5Dvb-1iNqi8r7a9FKBaFaiPeXs",
          },
        }
      )

      const data = response.data.data.results

    console.log("API Response WEEDENS:", response)
    dispatch(setFlights(response))
    console.log("PUSING", response.data.data.results)

      let results = {}
      if (page && limit) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        if (endIndex < data.length) {
          results.next = { page: page + 1, limit: limit }
        }

        if (startIndex > 0) {
          results.previous = { page: page - 1, limit: limit }
        }

        results.results = data.slice(startIndex, endIndex)
      } else {
        results.results = data.slice()
      }

      return results
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.message)
    }
  }
)

// Fetch flight by ID
export const fetchFlightById = createAsyncThunk(
  "flights/fetchFlightById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/flights/${id}`,
        {
          headers: {
            Authorization: "Bearer your_token_here",
          },
        }
      )
      return response.data.data
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.message)
    }
  }
)
