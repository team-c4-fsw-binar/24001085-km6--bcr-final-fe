import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedFrom: null,
    selectedTo: null,
    startDate: null,
    endDate: null,
    toggleSwitch: false,
    total_passengers: null,
    seatClass: null,
    cities: [],
    searchTerm: "",
    filteredCities: []
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setSelectedFrom: (state, action) => {
            state.selectedFrom = action.payload;
        },
        setSelectedTo: (state, action) => {
            state.selectedTo = action.payload;
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setToggleSwitch: (state, action) => {
            state.toggleSwitch = action.payload;
        },
        setTotalPassengers: (state, action) => {
            state.total_passengers = action.payload;
        },
        setSeatClass: (state, action) => {
            state.seatClass = action.payload;
        },
        setCities: (state, action) => {
            state.cities = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setFilteredCities: (state, action) => {
            state.filteredCities = action.payload;
        },
    },
});


export const {
    setSelectedFrom,
    setSelectedTo,
    setStartDate,
    setEndDate,
    setToggleSwitch,
    setTotalPassengers,
    setSeatClass,
    setCities,
    setSearchTerm,
    setFilteredCities,
} = homeSlice.actions;


export default homeSlice.reducer;