import { HStack, Text, VStack } from '@chakra-ui/react';
import TableComponent from './table';
import { ShadowBox } from './shadowBox';
import { TextTitle } from './TextTitle';
import { useEffect, useState } from 'react';
import { useMyHistoryFetchQuery } from '../hooks/useFetchQuery';
import { useAuth } from '../context/authContext';
import { useMyOrders } from '../context/myOrderContext';

export const MyHistory = () => {
    const [data, setData] = useState([])
    const { user } = useAuth()
    const query = useMyHistoryFetchQuery({userId: user.id})
    const { updateMyOrder } = useMyOrders()
    const headers = [
        'transaction',
        'from',
        'to',
        'stock',
        'amount',
        'price',
        'date'
    ]

    const columns = [
        'id',
        'from',
        'to',
        'stock',
        'amount',
        'price',
        'date'
    ]  
    useEffect(() => {
        if(query.isSuccess) {
            console.log("transactin hsitory",query.data.data)
            setData(query.data.data)
            updateMyOrder()
        }
        if(query.isError || query.data === undefined) {
            query.refetch({
                enabled: false,
                refetchInterval: false
            })
        }
    },[query])   
    return (
        <ShadowBox height={'80vh'}>
            <TextTitle title={'My History'}></TextTitle>
            <TableComponent data={data} headers={headers} columns={columns} />
        </ShadowBox>
    );
}
