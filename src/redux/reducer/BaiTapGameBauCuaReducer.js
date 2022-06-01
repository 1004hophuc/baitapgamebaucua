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


            // Xử lý tăng điểm thưởng
            // (duyệt qua mỗi xúc xắc so với 6 danh sách quân cược, nếu trúng thì tính tiền, trúng 2 lần thì tính tiền 2 lần (duyệt 2 lần))
            // Dùng forEach thay map, vì map nó trả về mảng, còn forEach nó không trả về gì hết, nó chỉ giúp mình duyệt thôi
            mangXucXacRandom.forEach((xucXac, index) => {
                let indexQuanCuc = danhSachCuocUpdate.findIndex(qc => qc.ma === xucXac.ma);
                if (indexQuanCuc !== -1) {
                    state.tongDiem += danhSachCuocUpdate[indexQuanCuc].diemCuoc;
                }
            })

            // Xử lý chức năng hoàn tiền và làm mới
            // duyệt qua 6 danh sách quân cược so với mảng 3 xúc xắc, nếu tìm thấy lần đầu tiên thì dừng vòng chạy và hoàn tiền về và sau đó làm mới lại mảng này

            // Bước 1: Hoàn tiền
            danhSachCuocUpdate.forEach((qc, index) => {
                let indexXucXac = mangXucXacRandom.findIndex(xx => xx.ma === qc.ma);
                if (indexXucXac !== -1) {
                    state.tongDiem += qc.diemCuoc;
                }
            })

            // Bước 2: Làm mới
            // Không dùng forEach được vì nó không trả về mảng mới nên state sẽ không thay đổi, do vậy dùng map để mà nó trả về mảng mới dẫn đến state thay đổi

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