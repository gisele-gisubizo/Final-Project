import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import LoginPage from './Components/LoginPage';
import Register from './Components/Register';
import Home from './Components/Home';
import Appetizer from './Components/Appetizer';
import Beverage from './Components/Beverage';
import Menu from './Components/Menu';
import Coffee from './Components/Coffee';
import Smoothie from './Components/Smoothie';
import ProtectedRoute from './Components/ProtectedRoute.jsx'; // Protect routes
import MyOrders from './Components/Myorders.jsx';
import Kitchen from './Components/Kitchen.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/Register' element={<Register />} />
      
          <Route path='/' element={<Layout />}>
            <Route path='/Home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/appetizer' element={<Appetizer />} />
            <Route path='/beverage' element={<Beverage />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/coffee' element={<Coffee />} />
            <Route path='/smoothie' element={<Smoothie />} />
            <Route path='/MyOrders' element={<MyOrders />} />
            <Route path='/Kitchen' element={<Kitchen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
