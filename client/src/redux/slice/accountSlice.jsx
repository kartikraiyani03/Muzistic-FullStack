/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    login : false,  
    userObject : null,
    users : []
}

let accountSlice = createSlice({
    name : 'account',
    initialState,
    reducers : {
        setLogin : (state) =>
        {
            state.login = true
        },
        signupHandler : (state, action) =>
        {
            state.userObject = action.payload
            state.login = true
            state.users = [...state.users, state.userObject]
            // Save user to localStorage when user signs up/logs in
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload))
            }
        },
        loginHandler : (state, action) =>
        {
            state.userObject = action.payload
            state.login = true
            console.log("User Login Successfully", state.userObject)
            // Save user to localStorage when user signs up/logs in
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload))
            }
        },
        logoutHandler :(state,action) =>
        {
            state.userObject = null
            state.login = false
            // Clear token from localStorage on logout
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
            console.log("User Logout Successfully")
        },
        restoreUser : (state) =>
        {
            // Restore user from localStorage on app load
            if (typeof window !== 'undefined') {
                const user = localStorage.getItem('user')
                if (user) {
                    state.userObject = JSON.parse(user)
                    state.login = true
                }
            }
        }
    }
})

export let {setLogin, signupHandler,loginHandler, logoutHandler, restoreUser } = accountSlice.actions
export default accountSlice.reducer
