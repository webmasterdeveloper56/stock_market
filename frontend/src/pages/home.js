import { Button, HStack, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import { BuyOder } from '../components/buy';
import { SellOder } from '../components/sell';
import { MatchinHistory } from '../components/history';

export const Home = () => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  
    return (
        <HStack margin={0} gap={0} justifyContent={'flex-start'} bgColor={'white'} alignContent={'center'} alignItems={'center'} flexWrap={isSmallerThan768?'wrap':'nowrap'}>
            <VStack 
                width={isSmallerThan768?'100%':'40%'} 
                justifyContent={'flex-start'} 
                padding={'20px'}
                gap={5}
            >
                <BuyOder />
                <SellOder />
            </VStack>
            <VStack 
                width={isSmallerThan768?'100%':'60%'} 
                justifyContent={'flex-start'} 
                // height={'90vh'} 
                padding={'20px'}
            >
                <MatchinHistory />
            </VStack>
        </HStack>
    );
}
