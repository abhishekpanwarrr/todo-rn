import { createSlice } from "@reduxjs/toolkit";

type TokenState = {
    token: string | null,
    user: {
        email: string
        name: string
        userId: string
    }
};

const initialState = {
    token: null,
    user: {}
} as TokenState;


const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
});

export const { setToken, setUser } = tokenSlice.actions;

export default tokenSlice.reducer;