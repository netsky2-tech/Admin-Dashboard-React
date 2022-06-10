import React from 'react'
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import { ContextProvider } from './contexts/ContextProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
    <BrowserRouter>
    <ContextProvider>
        <Routes>
            <Route path="/*" element={<App />} /> 
        </Routes>
    </ContextProvider>
    </BrowserRouter> 
    </React.StrictMode>,
    document.getElementById('root')
);