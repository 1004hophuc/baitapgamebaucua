import React from 'react';
import { useSelector } from 'react-redux';
import XucXac from './XucXac';
import { useDispatch } from 'react-redux';

export default function DanhSachXucXac() {

    const mangDanhSachXucXac = useSelector(state => state.BaiTapGameBauCuaReducer.danhSachXucXac);

    const dispatch = useDispatch();

    return (
        <div className="mt-5 ml-5" >
            <div className="bg-white" style={{ width: 300, height: 300, borderRadius: 150, paddingLeft: 10 }}>
                <div className="row">
                    <div className="col-12 text-center" style={{ marginLeft: '75px' }}>
                        <XucXac xucXacItem={mangDanhSachXucXac[0]} />
                    </div>
                </div>
                <div className="row" style={{ marginTop: -20 }}>
                    <div className="col-4 text-right">

                        <XucXac xucXacItem={mangDanhSachXucXac[1]} />


                    </div>
                    <div className="col-4 text-right" >

                        <XucXac xucXacItem={mangDanhSachXucXac[2]} />


                    </div>

                </div>
            </div>
            <div style={{ marginLeft: '20%', marginTop: '5%' }}>
                <button onClick={() => {
                    dispatch({
                        type: "XOC",
                    })
                }} className=""><img style={{ width: 200 }} src="./img/BaiTapGameBauCua/soc.png" alt="img"></img></button>
            </div>
        </div>
    )
}

// dispatch "XOC" do mình không cần gửi gì lên trên reducer khi bấm nút XOC nên là tham số thứ 2 của dispatch mình để trống.
// Chúng ta chỉ cho reducer biết khi bấm nút XOC thì action gì xảy ra thôi