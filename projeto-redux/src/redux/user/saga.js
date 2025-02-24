import { all, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects'
import { fetchUsersFail, fetchUsersSeccess, fetchUserByIdFail, fetchUserByIdSucess } from './slice'

import axios from 'axios';

//API USERS: https://jsonplaceholder.typicode.com/users

//SAGA PODE SER USADO PARA QUANDO É PRECISO UTILIZAR ALGUMA CHAMADA HTTP OU ASINCRONA DENTRO DE UNM SLICE

function* fetchUsers() {
    try {
        // yield delay(2000);
        const response = yield call(axios.get, "https://jsonplaceholder.typicode.com/users/")
        yield put(fetchUsersSeccess(response.data))
    }
    catch(er) {
        yield put(fetchUsersFail(er.message))
    }
}

function* fetchUserById(action) {
    try {
        const userId = action.payload;
        // yield delay(2000);
        const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${userId}`)
        yield put(fetchUserByIdSucess(response.data))
    }
    catch(er) {
        yield put(fetchUserByIdFail(er.message))
    }
}

export default all([
    // takeEvery("user/fetchUsers", fetchUsers) //Executa todas as vezes
    takeLatest("user/fetchUsers", fetchUsers), //Executa apenas a ultima
    takeLatest("user/fetchUserById", fetchUserById) //Executa apenas a ultima
])