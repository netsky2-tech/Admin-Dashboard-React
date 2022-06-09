import React from 'react'
import Header from '../components/Admon/Header'
import Login from '../components/Admon/Login'

export default function LoginPage(){
    return(
        <>
             <Header
                heading="Inicia sesión"
                paragraph="No tienes cuenta aún? "
                linkName="Registrate"
                linkUrl="/register"
                />
            <Login/>
        </>
    )
}