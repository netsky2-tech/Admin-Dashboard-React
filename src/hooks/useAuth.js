import { useContext } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
const useAuth = () =>{
    return useContext(ContextProvider)
}

export default useAuth;