import { useEffect, useState } from 'react';
import { ShadowBox } from './shadowBox';
import { TextTitle } from './TextTitle';
import TableWithAction from './tablewithAction';
import { useAuth } from '../context/authContext';
import { useMyOrders } from '../context/myOrderContext';
import { deleteOrder } from '../services/apiAction';
import ConfirmModal from './confirmModal';

export const MyOders = () => {
    const { myOrders, updateMyOrder } = useMyOrders()
    const headers = [
        'stock name',
        'amount',
        'price',
        'type',
        'action'
    ]
    const columns = [
        'stock',
        'amount',
        'price',
        'type'
    ]

    const CancelHandler = async (order) => {
        const confirmed = window.confirm('Are you sure want to delete this order?')
        if (confirmed) {
            const returnData = await deleteOrder({
                orderId: order.id
            })
            if (returnData.status == "success") {
                updateMyOrder()
            } else {

            }
        }
    }
    return (
        <ShadowBox height={'40vh'}>
            <TextTitle title={'My Orders'}></TextTitle>
            <TableWithAction
                data={myOrders}
                headers={headers}
                columns={columns}
                actionHandler={CancelHandler}
                actionTitle={"cancel"}
            />
        </ShadowBox>
    );
}
