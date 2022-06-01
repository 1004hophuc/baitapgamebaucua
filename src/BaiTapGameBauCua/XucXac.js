import React from 'react';
import { Fragment } from 'react';

export default function XucXac(props) {

    const { xucXacItem } = props;

    return (
        <Fragment>
            <div className="scene">
                <div className="cube">
                    <img className="ml-3 cube__face front" style={{ width: 50 }} src={xucXacItem.hinhAnh} alt="img" />
                    <img className="ml-3 cube__face back" style={{ width: 50 }} src="./img/BaiTapGameBauCua/bau.png" alt="img" />
                    <img className="ml-3 cube__face left" style={{ width: 50 }} src="./img/BaiTapGameBauCua/ga.png" alt="img" />
                    <img className="ml-3 cube__face right" style={{ width: 50 }} src="./img/BaiTapGameBauCua/ca.png" alt="img" />
                    <img className="ml-3 cube__face top" style={{ width: 50 }} src="./img/BaiTapGameBauCua/tom.png" alt="img" />
                    <img className="ml-3 cube__face bottom" style={{ width: 50 }} src="./img/BaiTapGameBauCua/nai.png" alt="img" />
                </div>
            </div>
        </Fragment>
    )
}