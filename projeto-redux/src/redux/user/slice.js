import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        createUser: (state, action) => {
            // console.log(action.payload)

            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    address: null
                }
            }
        }
    }
})

export const { createUser } = userSlice.actions;

export default userSlice.reducer;