import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            console.log("setToken inside authslice, token: ", state, state.token, action.payload);
        },
        clearToken: (state) => {
            console.log("clearToken 1, token: ", state, state.token);
            state.token = null;
            console.log("clearToken 2, token: ", state,state.token);
        },
    },
})

export const {setToken, clearToken} = authSlice.actions;
export default authSlice.reducer;