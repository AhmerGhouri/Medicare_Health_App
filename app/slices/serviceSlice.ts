import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../Store/Store";


const shortCode : string =  "";


export const ServiceSlice = createSlice({
    name : "shortCode",
    initialState : shortCode ,
    reducers : {

        addSerShortCodeToStore : (state, action: PayloadAction<any>) => {

            const serShortCode = action.payload // Add unique
            return state = serShortCode

        },
       

    }
})
export const { addSerShortCodeToStore } = ServiceSlice.actions
export default ServiceSlice.reducer