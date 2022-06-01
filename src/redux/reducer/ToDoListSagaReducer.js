import { GET_DATA_API } from "../../constants/ToDoListConstants"


const initialState = {
    taskList: []
}

const ToDoListSagaReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_API: {
            state.taskList = action.taskList
            return { ...state }
        }

        default:
            return state
    }
}
export default ToDoListSagaReducer;

