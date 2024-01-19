import React, { createContext, useContext, useEffect, useState } from 'react';
import { userOrders } from '../services/apiAction';
import { useAuth } from './authContext';

const MyOrdersContext = createContext();

export const MyOrdersProvider = ({ children }) => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    const getData = async () => {
      if (user && user.id) {
        const res = await userOrders({ userId: user.id });
        console.log(res);
        if (res.status === "success") {
          setMyOrders(res.data);
        }
      }
    };

    getData();
  }, [user]);

  const updateMyOrder = async () => {
    const res = await userOrders({ userId: user.id });
    if (res.status === "success") {
      setMyOrders(res.data);
    }
  };

  const contextValue = {
    myOrders,
    updateMyOrder,
  };

  return (
    <MyOrdersContext.Provider value={contextValue}>
      {children}
    </MyOrdersContext.Provider>
  );
};

export const useMyOrders = () => {
  const context = useContext(MyOrdersContext);
  if (!context) {
    throw new Error('useMyOrders must be used within a MyOrdersProvider');
  }
  return context;
};
