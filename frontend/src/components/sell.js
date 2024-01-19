import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import TableComponent from './table';
import { useEffect, useState } from 'react';
import { ShadowBox } from './shadowBox';
import { TextTitle } from './TextTitle';
import { useSellFetchQuery } from '../hooks/useFetchQuery';

export const SellOder = () => {
    const [data, setData] = useState([]);
    const headers = [
        'owner',
        'stock name',
        'amount',
        'price'
    ]
    const columns = [
        'owner',
        'stock',
        'amount',
        'price',
    ]

    const query = useSellFetchQuery()
    useEffect(() => {
        if(query.isSuccess) {
            if(query.data?.status == "success") {
                setData(query.data.data)
            }
        }
        if(query.isError || query.data === undefined) {
            query.refetch({
                enabled: false,
                refetchInterval: false
            })
        }        
    },[query])    
    return (
        <ShadowBox height={'40vh'}>
            <TextTitle title={'Sell Orders'}>sell oders</TextTitle>
            <TableComponent data={data} headers={headers} columns={columns} isLoading={query.isLoading} />
        </ShadowBox>
    );
}
