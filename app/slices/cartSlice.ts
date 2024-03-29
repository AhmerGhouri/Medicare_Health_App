import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { act } from "react-test-renderer";




export interface CartItem {

    amt?: string | undefined;
    currentaddress?: string | undefined;
    ltesT_DESC?: string | undefined;
    ltesT_ID?: string | undefined;
    opaT_ID?: string | undefined;
    isChecked?: boolean,
    samplE_COL_DATE?: string | undefined;
    samplE_COL_TIME?: string | undefined | null;
    tesT_DESCRIPTION?: string | undefined;
    id?: string,


}

interface opatDataType {
    currentaddress?: string,
    opaT_ID?: string,
    samplE_COL_DATE?: string,
    samplE_COL_TIME?: string | null
}

const cartItem: CartItem[] = []
const opatData: opatDataType = {}


export const Cart = createSlice({
    name: "Cart",
    initialState: {
        currentOpatId: opatData,
        cartItem: cartItem,
        errorMessage: false,
    },
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {

            const statecart = action.payload // Add unique
            // state.cartItem = action.payload
            console.log("statecart ", statecart)

            const checked = statecart.isChecked
            // const findTests = state.cartItem.findIndex(e => e.id === statecart.id && e.isChecked);

            // console.log("Same Tests", findTests);

            console.log("checked", checked);
            if (checked) {

                const cartvalues = {

                    ...action.payload,
                    currentaddress: state.currentOpatId.currentaddress,
                    opaT_ID: state.currentOpatId.opaT_ID,
                    samplE_COL_DATE: state.currentOpatId.samplE_COL_DATE,
                    samplE_COL_TIME: state.currentOpatId.samplE_COL_TIME

                }

                
                const findTests = state.cartItem.findIndex(e => e.ltesT_ID === cartvalues.ltesT_ID && e.isChecked === cartvalues.isChecked 
                    && e.opaT_ID === cartvalues.opaT_ID && e.samplE_COL_TIME === cartvalues.samplE_COL_TIME 
                    && e.samplE_COL_DATE === cartvalues.samplE_COL_DATE);
                
                console.log("Same test" , findTests);
                

                if (findTests >= 0) {
                    
                    state.errorMessage = true
                    // Alert.alert('' ,'This Service is already exists in Cart. Kindly Check Your Cart and proceed further')
                    
                }else{

                    console.log("opat Values from Slice", state.currentOpatId);
                    console.log("cart Values from Slice", cartvalues);
                    
                    
                    state.cartItem.push(cartvalues)
                }


            }
            else {

                state.cartItem = state.cartItem.filter((item) => item.ltesT_ID !== statecart.ltesT_ID);


            }




            console.log("cart Item from Slice", state.cartItem);


            // console.log("action cart" , statecart)
            // state.cartItem.push( statecart  );

        },
        removeFromCart: (state, action: PayloadAction<string | undefined | CartItem>) => {
            let updatedCart = state.cartItem.filter((item) => item.ltesT_ID !== action.payload)
            return {
                ...state,
                cartItem: updatedCart
            }
        },
        setOpatId: (state, action: PayloadAction<opatDataType>) => {
            state.currentOpatId = action.payload;
            console.log("setOpatId Action ", action.payload);
            console.log("setOpatId State ", state.currentOpatId);
            console.log("setOpatId State ", state.cartItem);

        },
        removeAllFromCart: (state) => {
            state.cartItem = [];
        },
        closeModal:(state)=>{
           state.errorMessage=false
        }
        // removeFromCart(state, action) {
        //     const { cartItem } = state;
        //     const index = cartItem.findIndex(item => item === action.payload); // Use findIndex
        //     if (index !== -1) {
        //       return { ...state, LabTest: [...cartItem.slice(0, index), ...cartItem.slice(index + 1)] };
        //     }
        //     return state; // No change if item not found
        //   }

    }
});




export const { addToCart, removeFromCart, removeAllFromCart, setOpatId , closeModal} = Cart.actions
export default Cart.reducer 