import heroes from "../components/heroesList/heroesSlice";
import {configureStore} from "@reduxjs/toolkit";
import filters from "../components/heroesFilters/filtersSlice"

const store = configureStore({
    reducer: {heroes, filters},
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;