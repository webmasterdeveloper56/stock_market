import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TableComponent from './table';
import { ShadowBox } from './shadowBox';
import { TextTitle } from './TextTitle';
import { useHistoryFetchQuery } from '../hooks/useFetchQuery';

export const MatchinHistory = () => {
    const [data, setData] = useState([])
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

    const query = useHistoryFetchQuery()
    useEffect(() => {
        if(query.isSuccess) {
            console.log("transactin hsitory",query.data.data)
            setData(query.data.data)
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
            <TextTitle title={'Matching Histories'} ></TextTitle>
            <TableComponent data={data} headers={headers} columns={columns} isLoading={query.isLoading} />
        </ShadowBox>
    );
}
