// Viết riêng hàm gọi API

import axios, { Axios } from "axios"
import { DOMAIN } from "../util/constants/settingsystems"

export class ToDoListService {
    constructor() {
    }
    getTaskApi = () => {
        return new axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }

    addTaskApi = (taskName) => {
        return new axios({
            url: `${DOMAIN}/ToDoList/AddTask`,
            method: 'POST',
            data: {
                taskName: taskName
            }
        })
    }

    deleteTaskApi = (taskName) => {
        return new axios({
            url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
    }

    checkTaskApi = (taskName) => {
        return axios({
            url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }

    rejectTaskApi = (taskName) => {
        return new axios({
            url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }
}

const toDoListService = new ToDoListService()
export default toDoListService;