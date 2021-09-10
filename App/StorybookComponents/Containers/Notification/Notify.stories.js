import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, object, select } from '@storybook/addon-knobs';
import { scale } from 'utils/Functions'
import { Colors, Fonts } from 'themes'
import NOTIFY from '../../../Configs/Enums/Notify'
import Notify from './Notify';
import EpayNotify from './EpayNotify';
import TransactionNotify from './TransactionNotify';
import Nothing from './Nothing';

const data = [
    {
        "Content": "Hãy thể hiện tình yêu của bạn với công nghệ bằng cách trải nghiệm thanh toán ăn vặt hiện đại trên EPAY ngay hôm nay. Bạn sẽ được thử cảm giác “ E-xèng rơi vỡ đầu “, thanh toán siêu tốc độ và ăn không giới hạn. Tầng 10 vào lúc 14H30 đến 15H30 EPAY rất vui lòng được phục vụ bạn.",
        "ContentImgUrl": "https://portal.epayservices.com.vn/images/promo/promo-11-08-2020.jpg",
        "Time": "10-08-2020 20:47:04",
        "Title": "Ăn vặt thời 4.0, bạn đã thử chưa",
    },
    {
        "Content": "Nhận ngay ưu đãi lên đến 498K khi thanh toán cùng chúng tôi: \n-Hội viên mới đăng ký 2 tháng: chỉ 699K (miễn phí Hội viên) \n-Hội viên cũ gia hạn 1 tháng: Chỉ 300K (COUPON CODE: EPAY99)",
        "ContentImgUrl": "https://portal.epayservices.com.vn/images/promo/TNG-17-09-2020.jpg",
        "Time": "16-09-2020 08:51:02",
        "Title": "Thanh toán EPAY - Giảm ngay 99K",
    }
]
const menu = [
    { id: 0, title: NOTIFY.ALL },
    { id: 1, title: NOTIFY.CHARGES },
    { id: 2, title: NOTIFY.PROMOTION },
    { id: 3, title: NOTIFY.OTHER },
];
const transaction = [
    { label: 'Chuyển từ', value: "Ví Epay" },
    { label: 'Chuyển đến', value: "Bảo An Đỗ" },
    { label: 'Số điện thoại', value: "909000999" },
    { label: 'Số tiền', value: "10.000 vnđ" },
    { label: 'Lời nhắn', value: "Nạp 10k" },
    { label: 'Phí giao dịch', value: "Miễn phí" },
    { label: 'Tổng tiền', value: "10.000 vnđ" },
]
storiesOf('Layout/Notify', module)
    .addDecorator(withKnobs)
    .add('Danh sách thông báo', () => <Notify data={data} menu={menu} />)
    .add('Chi tiết thông báo', () => <EpayNotify />)
    .add('Chi tiết giao dịch', () => <TransactionNotify data={transaction} />)
    .add('Không có thông báo', () => <Nothing menu={menu} />)