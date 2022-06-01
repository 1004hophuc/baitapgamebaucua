import { HIDE_LOADING, SHOW_LOADING } from "../../constants/LoadingConstant"

const initialState = {
    isLoading: true
}

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {

        case SHOW_LOADING:
            state.isLoading = true
            return { ...state }

        case HIDE_LOADING:
            state.isLoading = false
            return { ...state }

        default:
            return state
    }
}

export default LoadingReducer;