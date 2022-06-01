import { applyMiddleware, combineReducers } from 'redux';
import { BaiTapGameBauCuaReducer } from './reducer/BaiTapGameBauCuaReducer';
import { createStore } from 'redux';

import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import LoadingReducer from './reducer/LoadingReducer';
import ToDoListSagaReducer from './reducer/ToDoListSagaReducer';
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    BaiTapGameBauCuaReducer,
    ToDoListSagaReducer,
    LoadingReducer
})

const store = createStore(rootReducer, {}, applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);


export default store;