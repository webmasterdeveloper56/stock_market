import { useEffect, useState } from 'react';
import { ShadowBox } from './shadowBox';
import { TextTitle } from './TextTitle';
import TableWithAction from './tablewithAction';
import { Button, HStack, Input, InputGroup, InputLeftAddon, InputLeftElement, Select, Text, VStack } from '@chakra-ui/react';
import { getAllStocks, setOrders } from '../services/apiAction';
import { useAuth } from '../context/authContext';
import ConfirmModal from './confirmModal';
import { useMyOrders } from '../context/myOrderContext';

export const StockPlaceMent = () => {
    const [data, setData] = useState([])
    const [stockId, setStockId] = useState(1);
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState('buy');
    const { user } = useAuth()
    const { updateMyOrder } = useMyOrders()
    useEffect(() => {
        const getStocks = async () => {
            const res = await getAllStocks()
            console.log("res", res)
            if (res.status == "success") {
                setData(res.data)
            }
        }
        getStocks()
    }, [])

    const confirmHandler = async (type) => {
        const returnData = await setOrders({
            userId: user.id,
            type: type,
            stockId: stockId,
            amount: amount,
            price: price
        })
        if (returnData.status == "success") {
            setOpenModal(false)
            updateMyOrder()
        } else {

        }
    };

    const clickHandler = (type) => {
        if(stockId == 0) {
            window.alert('Please select a Stock')
            return
        }
        setType(type)
        setOpenModal(true)
    }
    const amountHandler = (e) => {
        if (e.target.value < 0) {
            return;
        }
        setAmount(e.target.value)
    }
    const priceHandler = (e) => {
        if (e.target.value < 0) {
            return;
        }
        setPrice(e.target.value)
    }
    return (
        <ShadowBox height={'40vh'}>
            <TextTitle title={'Order Placement'}></TextTitle>
            <VStack gap={5} width={'80%'} mt={'30px'}>
                <HStack gap={'10px'} width={'60%'}>
                    <Text>Stocks</Text>
                    <Select onChange={(e) => setStockId(e.target.value)} placeholder='select stock' defaultValue={1}>
                        {
                            data.map((stock) => {
                                return <option value={stock.id}> {stock.stockname}</option>
                            })
                        }
                    </Select>
                </HStack>

                <HStack>
                    <label>amount:</label>
                    <Input textAlign={'end'} placeholder={'amount'} value={amount} onChange={(e) => amountHandler(e)}></Input>
                    <label>price:</label>
                    <Input textAlign={'end'} placeholder='price' value={price} onChange={(e) => priceHandler(e)}></Input>
                </HStack>
                <HStack>
                    <Button width={'100px'} onClick={()=>clickHandler('buy')} >Buy</Button>
                    <Button width={'100px'} onClick={()=>clickHandler('sell')}>Sell</Button>
                </HStack>
            </VStack>
            <ConfirmModal isOpen={openModal} onClose={() => setOpenModal(false)} confirmHandler={confirmHandler} type = {type}/>
        </ShadowBox>
    );
}
