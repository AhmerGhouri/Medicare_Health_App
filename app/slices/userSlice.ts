import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { appUser, checkedData } from "../../constants";


const initialState: appUser = {};

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {

        addUserToStore: (state, action: PayloadAction<appUser>) => {

            const user = action.payload // Add unique
            console.log("user store" , user);
            
            return state = user

        },
       

    }
})

export const { addUserToStore } = userSlice.actions
export default userSlice.reducer