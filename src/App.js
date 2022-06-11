import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import Register from './components/Admon/Register';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Login from '../src/pages/Login';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import RequiereAuth from './components/RequiereAuth';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, auth, SetAuth } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
        <Routes>
          {/*Instancia a login sin layout*/}
          <Route path="/" element={<Login/>} />

          {/*Instancia a layout y sus childrens - Rutas protegidas*/}
          <Route path="/" element={<Layout/>}>

                       <Route path="/dashboard" element={(<Ecommerce />)} />
            <Route path="/categorias" element={(<Orders />)} />
            <Route path="/productos" element={(<Employees />)} />
            <Route element={<RequiereAuth>

            </RequiereAuth>}>
                
            </Route>

          </Route>

          {/*Instancia a Not found*/}
          <Route path="*" element={<NotFound/>} />

        </Routes>
  );
};

export default App;