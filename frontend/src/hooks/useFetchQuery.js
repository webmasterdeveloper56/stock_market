import { useQuery,setQueriesData  } from 'react-query';
import { getAllHistory, getBuys, getSells, userHistory, userOrders } from '../services/apiAction';
const interval = 2500
export const useBuyFetchQuery = () => {
    const query = useQuery(
        ['order-buy'],
        () => getBuys(),
        {
            enabled: true,
            ...{ refetchInterval: interval },
        }
    );
    return query;
};

export const useSellFetchQuery = () => {
    const query = useQuery(
        ['order-sell'],
        () => getSells(),
        {
            enabled: true,
            ...{ refetchInterval: interval },
        }
    );
    return query;
};


export const useHistoryFetchQuery = () => {
    const query = useQuery(
        ['order-history'],
        () => getAllHistory(),
        {
            enabled: true,
            ...{ refetchInterval: interval },
        }
    );
    return query;
};

export const useMyHistoryFetchQuery = ({
    userId
}) => {
    const query = useQuery(
        ['my-order-history'],
        () => userHistory({userId}),
        {
            enabled: true,
            ...{ refetchInterval: interval },
        }
    );
    return query;
};


export const useMyOrderFetchQuery = ({
    userId
}) => {
    const query = useQuery(
        ['my-order'],
        () => userOrders({userId}),
        {
            enabled: true,
            ...{ refetchInterval: interval },
        }
    );
    return query;
};
