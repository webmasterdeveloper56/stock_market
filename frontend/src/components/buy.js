import TableComponent from './table';
import { useEffect, useState } from 'react';
import { ShadowBox } from './shadowBox';
import { TextTitle } from './TextTitle';
import {useBuyFetchQuery} from '../hooks/useFetchQuery';

export const BuyOder = () => {
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
        'price'
    ]
    const buysQuery = useBuyFetchQuery();
    useEffect(() => {
        if(buysQuery.isSuccess) {
            console.log(buysQuery.data)
            if(buysQuery.data.status == "success") {
                setData(buysQuery.data.data)
            }
        }
        if(buysQuery.isError || buysQuery.data === undefined) {
            buysQuery.refetch({
                enabled: false,
                refetchInterval: false
            })
        }        
    }, [buysQuery])
    return (
        <ShadowBox height={'40vh'}>
            <TextTitle title={'Buy Orders'}></TextTitle>
            <TableComponent data={data} headers={headers} columns={columns} isLoading={buysQuery.isLoading} />
        </ShadowBox>
    );
}
