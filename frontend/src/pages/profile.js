import { HStack, VStack, useMediaQuery } from '@chakra-ui/react';
import { MyStock } from '../components/myStock';
import { MyHistory } from '../components/myhistory';
import { MyOders } from '../components/myOders';
import { StockPlaceMent } from '../components/placement';

export const Profile = () => {
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <HStack flex="1" justifyContent={'space-around'} height="100vh" alignItems={'flex-start'} flexWrap={isSmallerThan768 ? 'wrap' : 'nowrap'} bgColor={'rgba(0,0,0,0.2)'}>
      <VStack
        width={isSmallerThan768 ? '100%' : '40%'}
        justifyContent={'flex-start'}
        pt={'20px'}
        pl={'20px'}
        pr={'20px'}
        gap={5}
      >
        <StockPlaceMent />
        <MyOders />
      </VStack>
      <VStack
        width={isSmallerThan768 ? '100%' : '60%'}
        justifyContent={'flex-start'}
        // height={'90vh'} 
        pt={'20px'}
        pl={'20px'}
        pr={'20px'}
      >
        <MyHistory />
        </VStack>
    </HStack>
  );
}
