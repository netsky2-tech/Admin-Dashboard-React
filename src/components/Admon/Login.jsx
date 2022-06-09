import { useEffect, useRef, useState } from 'react';
import { loginFields } from "../../contexts/FormFields";
import Input from "./Input";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import axios from '../../Services/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){

    const login_url = 'api/Login';
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pswd, setPswd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');
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


    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(login_url,
                JSON.stringify({loginState}),
                {
                    headers: {
                        'Content-Type' : 'application/json',
                        withCredentials: true
                },
                });
                if(response.data?.Outcome === false){
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {/* Same as */}
                    <ToastContainer />
                    console.log(response.data?.Message)
                }    
                console.log(JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
                //setLoginState('');
                setSuccess(true);
        } catch (error) {
            if(!error.response){
                setErrMsg("No hubo respuesta del servidor")
            }else if(error.response?.status === 400){
                setErrMsg("Usuario o contraseña invalido")
            }else if(error.response?.status === 401){
                setErrMsg("Sin autorización")
            }else {
                setErrMsg("El inicio de sesión ha fallado");
            }
            //errRef.current.focus();
        }

    }
 
    return(
        <>
            {success ? (
                <section>
                    <h1>You are logged in</h1>
                </section>
            ) : (
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
       
      </form>

      )}</>
        
    )
}