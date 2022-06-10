import React from 'react'
import Header from '../components/Admon/Header'
import Login from '../components/Admon/Login'

export default function LoginPage(){
    return(
        <>
        
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
             <Header
                heading="Inicia sesión"
                paragraph="No tienes cuenta aún? "
                linkName="Registrate"
                linkUrl="/register"
                />
            <Login/>
                </div>
  </div>
        </>
    )
}