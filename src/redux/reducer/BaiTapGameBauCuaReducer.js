const stateDefault = {
    danhSachCuoc: [
        { ma: "bau", hinhAnh: "./img/BaiTapGameBauCua/bau.png", diemCuoc: 0 },
        { ma: "cua", hinhAnh: "./img/BaiTapGameBauCua/cua.png", diemCuoc: 0 },
        { ma: "tom", hinhAnh: "./img/BaiTapGameBauCua/tom.png", diemCuoc: 0 },
        { ma: "ca", hinhAnh: "./img/BaiTapGameBauCua/ca.png", diemCuoc: 0 },
        { ma: "ga", hinhAnh: "./img/BaiTapGameBauCua/ga.png", diemCuoc: 0 },
        { ma: "nai", hinhAnh: "./img/BaiTapGameBauCua/nai.png", diemCuoc: 0 },
    ],
    tongDiem: 1000,
    danhSachXucXac: [
        { ma: "bau", hinhAnh: "./img/BaiTapGameBauCua/bau.png", diemCuoc: 0 },
        { ma: "cua", hinhAnh: "./img/BaiTapGameBauCua/cua.png", diemCuoc: 0 },
        { ma: "tom", hinhAnh: "./img/BaiTapGameBauCua/tom.png", diemCuoc: 0 },
    ]
}

export const BaiTapGameBauCuaReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "TANG_GIAM_DIEM_CUOC": {
            const danhSachCuocUpdate = [...state.danhSachCuoc];

            const indexDSC = danhSachCuocUpdate.findIndex(qc => qc.ma === action.quanCuoc.ma);
            if (indexDSC !== -1) {
                if (action.status && state.tongDiem > 0) {
                    danhSachCuocUpdate[indexDSC].diemCuoc += 100;
                    state.tongDiem -= 100;
                } else {
                    if (danhSachCuocUpdate[indexDSC].diemCuoc > 0) {
                        danhSachCuocUpdate[indexDSC].diemCuoc -= 100;
                        state.tongDiem += 100;
                    }
                }
            }
            state.danhSachCuoc = danhSachCuocUpdate;
            return { ...state };
        }

        case "XOC": {

            console.log(action)
            const danhSachCuocUpdate = [...state.danhSachCuoc];

            const mangXucXacRandom = [];

            for (let i = 0; i < 3; i++) {
                let numberNgauNhien = Math.floor(Math.random() * 6);
                const xucXac = danhSachCuocUpdate[numberNgauNhien];
                mangXucXacRandom.push(xucXac);
            }
            state.danhSachXucXac = mangXucXacRandom;
            console.log(mangXucXacRandom)


            // X??? l?? t??ng ??i???m th?????ng
            // (duy???t qua m???i x??c x???c so v???i 6 danh s??ch qu??n c?????c, n???u tr??ng th?? t??nh ti???n, tr??ng 2 l???n th?? t??nh ti???n 2 l???n (duy???t 2 l???n))
            // D??ng forEach thay map, v?? map n?? tr??? v??? m???ng, c??n forEach n?? kh??ng tr??? v??? g?? h???t, n?? ch??? gi??p m??nh duy???t th??i
            mangXucXacRandom.forEach((xucXac, index) => {
                let indexQuanCuc = danhSachCuocUpdate.findIndex(qc => qc.ma === xucXac.ma);
                if (indexQuanCuc !== -1) {
                    state.tongDiem += danhSachCuocUpdate[indexQuanCuc].diemCuoc;
                }
            })

            // X??? l?? ch???c n??ng ho??n ti???n v?? l??m m???i
            // duy???t qua 6 danh s??ch qu??n c?????c so v???i m???ng 3 x??c x???c, n???u t??m th???y l???n ?????u ti??n th?? d???ng v??ng ch???y v?? ho??n ti???n v??? v?? sau ???? l??m m???i l???i m???ng n??y

            // B?????c 1: Ho??n ti???n
            danhSachCuocUpdate.forEach((qc, index) => {
                let indexXucXac = mangXucXacRandom.findIndex(xx => xx.ma === qc.ma);
                if (indexXucXac !== -1) {
                    state.tongDiem += qc.diemCuoc;
                }
            })

            // B?????c 2: L??m m???i
            // Kh??ng d??ng forEach ???????c v?? n?? kh??ng tr??? v??? m???ng m???i n??n state s??? kh??ng thay ?????i, do v???y d??ng map ????? m?? n?? tr??? v??? m???ng m???i d???n ?????n state thay ?????i

            state.danhSachCuoc = danhSachCuocUpdate.map((qc, index) => {
                return { ...qc, diemCuoc: 0 };
            })

            return { ...state }
        }

        case "CHOI_LAI": {
            state.tongDiem = 1000;
            state.danhSachCuoc = state.danhSachCuoc.map((qc, index) => {
                return { ...qc, diemCuoc: 0 };
            })
            return { ...state }
        }

        default: return state;
    }

}