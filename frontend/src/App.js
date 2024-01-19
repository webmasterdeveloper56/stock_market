import logo from './logo.svg';
import './App.css';
import { HStack, VStack } from '@chakra-ui/react';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { useAuth } from './context/authContext';
import { useEffect } from 'react';
import { Header } from './components/header';
import { Profile } from './pages/profile';

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      const currentUrl = window.location.pathname;
      if (currentUrl != "/register") {
        navigate('/login')
      }
    }
  }, [user])
  return (
    <VStack
      h={'100vh'}
      w={'full'}
      align={'stretch'}
      bgGradient={'white'}
      justifyContent={'flex-start'}
      gap={0}
    >
      {
        user&&<Header />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </VStack>
  );
}

export default App;
