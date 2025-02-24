import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        users: [],
        loading: false
    },
    reducers: {
        createUser: (state, action) => {

            // if(action.payload.name.length <= 2) {
            //     alert('Preencha um nome maior que 4 Letras');
            //     return{ ...state }
            // }

            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    address: null
                }
            }
        },
        logoutUser: (state) => {
            return {
                ...state,
                user: null
            }
        },
        addAddress: (state, action) => {
            if(action.payload.location === '' || action.payload.number === '') {
                alert('Preencha todos os Campos')
                return {...state}
            }
            if(state.user == null) {
                alert("Faça o Cadastro para inserir o Endereço");
                return {...state}
            }
            alert("Dados Atualizados!!");
            return {
                ...state,
                user: {
                    ...state.user,
                    address: {
                        location: action.payload.location,
                        number: action.payload.number
                    }
                }
            }
        },
        deleteAddress: (state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    address: null
                }
            }
        },
        fetchUsers: (state) => {
            console.log('chamou nos')
            state.loading = true;
        },
        fetchUsersSeccess: (state, action) => {
            // console.log('Success')
            // console.log(action.payload);
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFail: (state, action) => {
            console.log('Fail')
            console.log(action.payload);
            state.loading = false;
        },
        fetchUserById: (state) => {
            console.log('chamou no top')
        },
        fetchUserByIdSucess: (state, action) => {
            console.log('User do Id');
            console.log(action.payload)
        },
        fetchUserByIdFail: (state) => {
            console.log('Deu Erro')
        }
    }
})

export const { createUser, logoutUser, addAddress, deleteAddress, fetchUsers, fetchUsersSeccess, fetchUsersFail, fetchUserById, fetchUserByIdSucess, fetchUserByIdFail } = userSlice.actions;

export default userSlice.reducer;