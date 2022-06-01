import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_DATA_API, GET_TASKLIST_API, REJECT_TASK_API } from '../constants/ToDoListConstants';
import './ToDoListSaga.css'

export default function ToDoListSaga() {

    const dispatch = useDispatch();

    const { taskList } = useSelector(state => state.ToDoListSagaReducer);

    let [state, setState] = useState({

        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        let newValues = { ...state.values };

        newValues = { ...newValues, [name]: value };

        let newErrors = { ...state.errors };

        const regexString = /^[A-Z a-z]+$/;
        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' is invalid!'
        } else {
            newErrors[name] = '';
        }

        setState({
            ...state,
            values: newValues,
            errors: newErrors
        });
    }

    const getTaskList = () => {
        dispatch({
            type: GET_TASKLIST_API
        })
    }

    // Hàm sẽ tự động thực thi sau khi nội dung component được render
    useEffect(() => {
        // dispatch action saga
        getTaskList()
        return () => {

        }
    }, [])

    const addTask = (e) => {
        e.preventDefault();
        dispatch({
            type: ADD_TASK_API,
            taskName: state.values.taskName
        })
    }

    const deleteTask = (taskName) => {
        dispatch({
            type: DELETE_TASK_API,
            taskName: taskName
        })
    }

    const doneTask = (taskName) => {
        dispatch({
            type: CHECK_TASK_API,
            taskName: taskName
        })
    }

    const rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName: taskName
        })
    }

    const renderTaskToDo = () => {
        return taskList.filter(ta => !ta.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button onClick={() => {
                        deleteTask(item.taskName);
                    }} type="button" className="remove">
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button onClick={() => { doneTask(item.taskName) }} type="button" className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    const renderTaskCompleted = () => {
        return taskList.filter(ta => ta.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button onClick={() => { deleteTask(item.taskName) }} type="button" className="remove">
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button onClick={() => {
                        rejectTask(item.taskName)
                    }} type="button" className="complete">
                        <i className="fas fa-undo" />
                    </button>
                    <button type="button" className="complete">
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    return (
        <div>
            <form onSubmit={addTask} >
                <div className="card">
                    <button type="button" className="btn btn-success" onClick={() => {
                        dispatch({
                            type: 'getTaskApiAction'
                        })
                    }}>Dispatch action saga getTaskApi</button>
                    <div className="card__header">
                        <img alt="img" src={require('./img/bg.png')} />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="form-group">
                                <div className="card__title">
                                    <h2>My Tasks</h2>
                                    <p>September 9,2020</p>
                                </div>
                                <div className="card__add">
                                    <input name="taskName" onChange={handleChange} id="newTask" type="text" placeholder="Enter an activity..." />

                                    <button onClick={addTask} id="addItem">
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                                <span className="text text-danger">{state.errors.taskName}</span>
                            </div>

                            <div className="card__todo form-group">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {renderTaskCompleted()}

                                    {/* <li>
                            <span>Ăn sáng</span>
                            <div className="buttons">
                                <button className="remove">
                                    <i className="fa fa-trash-alt" />
                                </button>
                                <button className="complete">
                                    <i className="far fa-check-circle" />
                                    <i className="fas fa-check-circle" />
                                </button>
                            </div>
                        </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
