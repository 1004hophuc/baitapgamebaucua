
// cách viết cũ trước khi tách ra

import { all } from "@redux-saga/core/effects";
// import nguyên 1 file vô dùng *

import * as ToDoListSaga from './ToDoListSagaActions';
// import { theoDoiActionGetTaskApi } from "./ToDoListSaga";

// import { Axios } from 'axios';
// import { fork, call, put, takeLatest, take } from 'redux-saga/effects';

// function* getTaskApi(action) {
//     console.log(action)
//     let { data } = yield call(() => {
//         return Axios({
//             url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
//             method: 'GET'
//         });
//     })
//     // Sau khi lấy giá trị thành công thì dispatch nó lên reducer = put
//     yield put({
//         type: 'GET_DATA_API',
//         taskList: data
//     })

// }

export function* rootSaga() {
    yield all([
        // Nghiêp vụ theo dõi các action saga todolist
        ToDoListSaga.theoDoiActionGetTaskApi(),
        ToDoListSaga.theoDoiAddTaskApi(),
        ToDoListSaga.theoDoiDeleteAction(),
        ToDoListSaga.theoDoiCheckTaskAction(),
        ToDoListSaga.theoDoiRejectTaskAction()
    ])
    // cách viết cũ trước khi tách
    // yield takeLatest('getTaskApiAction', getTaskApi);
}