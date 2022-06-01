import React from 'react';
import styleLoading from './LoadingComponent.module.css';
import { useSelector } from 'react-redux'

export default function LoadingComponent() {

    const { isLoading } = useSelector(state => state.LoadingReducer);
    console.log(isLoading);

    if (isLoading) {
        return (
            <div className="bgLoading">
                <img src={require('../../assets/imgLoading/loading.gif')} alt="img"></img>
            </div>
        )
    } else {
        return '';
    }

}
