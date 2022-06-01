import axios, { Axios } from 'axios';
import { fork, call, put, takeLatest, take, delay } from 'redux-saga/effects';
import { HIDE_LOADING, SHOW_LOADING } from '../../constants/LoadingConstant';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_DATA_API, GET_TASKLIST_API, REJECT_TASK_API } from '../../constants/ToDoListConstants';
import toDoListService from '../../services/ToDoListService';
import { STATUS_CODE } from '../../util/constants/settingsystems';

/*
Ngày 2/5 Phúc viết chức năng getTask, action saga lấy danh sách task từ API
*/

function* getTaskApiAction(action) {

    // let { data, status } = yield call(() => {
    //     return new axios({
    //         url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
    //         method: "GET"
    //     })
    // })

    // yield put({
    //     type: GET_DATA_API,
    //     taskList: data
    // })

    // put loading giống dispatch action
    yield put({
        type: SHOW_LOADING
    })

    try {
        let { data, status } = yield call(toDoListService.getTaskApi)
        // Sau khi lấy giá trị thành công thì dispatch nó lên reducer = put

        yield delay(1000);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_DATA_API,
                taskList: data
            })
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error.response.data)
    }



    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

// Trước đây trong hàm call mình sẽ xử lý nguyên action call api từ backend, bây giờ tách nó ra riêng ở file service cho dễ maintain thì chỉ cần import nó vào call là được 
/*
() => {
        return Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
    }
*/

/*
Ngày 2/5 Phúc viết chức năng addTask, action saga addTask
*/

function* addTaskApiAction(action) {
    // Gọi api
    // Hiển thị loading
    // Thành công thì gọi lại task = cách gọi lại action saga load tasklist
    // Vì hàm có tham số nên là phải truyền theo dạng callback function

    let { taskName } = action;

    try {
        let { data, status } = yield call(() => { return toDoListService.addTaskApi(taskName) });
        if (status === STATUS_CODE.SUCCESS) {
            // dispatch lại action là function get lại taskList
            yield put({
                type: GET_TASKLIST_API
            })
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
    console.log(action)
}

export function* theoDoiAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}

/*
Ngày 2/5 Phúc viết chức năng deleteTask, action saga deleteTask
*/

function* deleteTaskApiAction(action) {

    let { taskName } = action;
    console.log(action)
    try {
        let { data, status } = yield call(() => { return toDoListService.deleteTaskApi(taskName) });

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                // dispatch lại action là function get lại taskList
                type: GET_TASKLIST_API
            })
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
}

export function* theoDoiDeleteAction() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApiAction)
}

/*
Ngày 2/5 Phúc viết chức năng checkTask, action saga checkTask
*/

function* checkTaskApiAction(action) {
    let { taskName } = action;
    try {
        let { data, status } = yield call(() => { return toDoListService.checkTaskApi(taskName) });

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                // dispatch lại action là function get lại taskList
                type: GET_TASKLIST_API
            })
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
}

export function* theoDoiCheckTaskAction() {
    yield takeLatest(CHECK_TASK_API, checkTaskApiAction)
}

/*
Ngày 2/5 Phúc viết chức năng rejectTask, action saga rejectTask
*/

function* rejectTaskApiAction(action) {
    console.log(action)
    let { taskName } = action;
    try {
        let { data, status } = yield call(() => { return toDoListService.rejectTaskApi(taskName) });

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                // dispatch lại action là function get lại taskList
                type: GET_TASKLIST_API
            })
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
}

export function* theoDoiRejectTaskAction() {
    yield takeLatest(REJECT_TASK_API, rejectTaskApiAction)
}