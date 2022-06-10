import { useEffect, useRef, useState } from 'react';
import { loginFields } from "../../contexts/FormFields";
import Input from "./Input";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import axiosCliente from '../../Services/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth'
import { Link, useNavigate, useLocation } from "react-router-dom";


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){

    const  [auth, setAuth]  = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const login_url = 'api/Login';
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pswd, setPswd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loginState,setLoginState]=useState(fieldsState);

   /* useEffect(()=>{
        userRef.current.focus();
    }, [])*/

    useEffect(() => {
        setErrMsg('');
    }, [user, pswd])

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }



     function handleClick() {
        navigate("../ecommerce", { replace: true });
    }

    const handleSubmit= async (e) => {
        e.preventDefault();
            const response = await axiosCliente.post(login_url,
                JSON.stringify({username:loginState.username, pswd: loginState.pswd})
                ).then((res) =>{
                    setAuth(res.data?.Outcome);
                    navigate(from, { replace: true });
                    console.log(res.data?.Message);
                    console.log(JSON.stringify(res?.data));
                });
    }
 
    return(

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live = "assertive">{errMsg}</p>
                <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                          
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Inicia sesión"/>
       <ToastContainer></ToastContainer>
      </form>

      
        
    )
}