import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentWeather: "",
    city: "",

    feelsLike: "",
    tempMax: "",
    tempMin: "",
    icon: "",
    desc: "",
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        addCurrentWeather: (state, action) => {
            state.currentWeather = action.payload
        },
        addCity: (state, action) => {
            state.city = action.payload
        },
        feelsLike: (state, action) => {
            state.feelsLike = action.payload
        },
        tempMax: (state, action) => {
            state.tempMax = action.payload
        },
        tempMin: (state, action) => {
            state.tempMin = action.payload
        },
        icon: (state, action) => {
            state.icon = action.payload
        },
        desc: (state, action) => {
            state.desc = action.payload
        }
    }
})

export const {
    addCurrentWeather,
    addCity,
    feelsLike,
    tempMax,
    tempMin,
    icon,
    desc,
} = weatherSlice.actions

export default weatherSlice.reducer