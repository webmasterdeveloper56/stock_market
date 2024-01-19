import { useEffect, useState } from 'react';
import { ShadowBox } from './shadowBox';
import { TextTitle } from './TextTitle';
import TableWithAction from './tablewithAction';
import BuyModal from './confirmModal';
import SellModal from './sellOrder';

export const MyStock = () => {
    const [data, setData] = useState([]);
    const [isOpen, setOpenModal] = useState(false)
    const [stockData, setStockData] = useState({})
    const headers = [
        'stock name',
        'amount',
        'action'
    ]
    const columns = [
        'stockName',
        'amount',
    ]
    useEffect(() => {
        const fetchOders = async () => {
            const _data = [
                {
                    stockId:'0',
                    stockName: 'stock0',
                    amount: 300,
                },
                // {
                //     owner: 'kkk',
                //     stock: 'aaa',
                //     amount: 300,
                //     price:100
                // },
                // {
                //     owner: 'kkk',
                //     stock: 'aaa',
                //     amount: 300,
                //     price:100
                // },
                // {
                //     owner: 'kkk',
                //     stock: 'aaa',
                //     amount: 300,
                //     price:100
                // }
            ]
            setData(_data)
        }
        fetchOders()
    }, [])

    const SellHandler = async (stock) => {
        setOpenModal(true)
        console.log("stock",stock)
        setStockData(stock)
    }
    return (
        <ShadowBox height={'40vh'}>
            <TextTitle title={'My Stocks'}></TextTitle>
            <TableWithAction 
                data={data} 
                headers={headers} 
                columns={columns} 
                actionHandler={SellHandler} 
                actionTitle={"Sell"} 
            />
            <SellModal isOpen={isOpen} onClose={()=>setOpenModal(false)} data = {stockData}/>
        </ShadowBox>
    );
}
