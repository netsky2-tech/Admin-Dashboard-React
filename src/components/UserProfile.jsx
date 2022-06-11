import React from 'react'
import Cookies from "universal-cookie";

const UserProfile = () => {

  const cookies = new Cookies();

  const cerrarSesion = () =>{
    cookies.remove("Message");
    window.location.href = "./login ";
  }
  return (
    <div><button onClick={cerrarSesion}>Cerrar sesión</button></div>
  )
}

export default UserProfile