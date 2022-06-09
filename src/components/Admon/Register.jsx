import { useRef, useState, useEffect } from 'react'
import { FaCheck, FaInfoCircle, FaTimes } from 'react-icons/fa'
import axios from '../../Services/axios'
//import admon from '../../Services/Admon/auth'

const Register = () => {

    // Validación para caractener de nombre de usuario}

    const username_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    // Validación para caractener de contraseña}

    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    // Focus en inputs al cargar formulario}
    const userRef = useRef();
    // Focus en los errores si los hay}
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pswd, setPswd] = useState('');
    const [validPswd, setValidPswd] = useState(false);
    const [pswdFocus, setPswdFocus] = useState(false);

    const [matchPswd, setMatchPswd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const register_url = 'api/register';

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() =>{
        const result = username_regex.test(user);
        //console.log(result);
        //console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() =>{
        const result = password_regex.test(pswd);
        //console.log(result);
        //console.log(pswd);
        setValidPswd(result);
        const match = pswd === matchPswd;
        setValidMatch(match);
    }, [pswd, matchPswd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pswd, matchPswd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateUserName = username_regex.test(user);
        const validatePassword = password_regex.test(pswd);
        if(!validateUserName || !validatePassword){
            setErrMsg("Entrada invalida");
            return;
        }
        try {
            const response = await axios.post(register_url, JSON.stringify({ username : user, pswd : pswd }),
            {
                headers: {
                'Content-Type' : 'application/json',
                withCredentials: true
            },
                
            }
            );
                console.log(JSON.stringify(response.data))
                setSuccess(true);
                // Limpiar campos..
           
        } catch (error) {
            if(!errMsg.response){
                setErrMsg('No hubo respuesta del servidor')
            }else if (error.response?.status === 409){
                setErrMsg('El usuario ya ha sido tomado')
            }else {
                setErrMsg('Ha ocurrido un error inesperado')
            }
            errRef.current.focus();
        }
    }

  return (
      <>
      {success ? (
          <section>
              <h1>Success!</h1>
              <p>
                  <a href="#">Iniciar sesión</a>
              </p>
          </section>
      ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live = "assertive">{errMsg}</p>
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Nombre de usuario:</label>

            <input type="text" id='username' ref={userRef} autoComplete="off" name='username'
            onChange={(e) => setUser(e.target.value)} required aria-invalid={validName ? "false" : "true"} 
            aria-describedby="uidnote" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
            {/* Mostrar alerta de validación de nombre de usuario*/}
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FaInfoCircle /> La contraseña debe tener entre 4 y 24 carácteres. <br />
                                 Debe empezar con una letra.
            </p>

            <label htmlFor="password">
                            Password:
                            <FaCheck className={validPswd ? 'valid' : 'hide'}></FaCheck>
                            <FaTimes className={validPswd || !pswd ? "hide" : "invalid"}></FaTimes>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPswd(e.target.value)}
                            value={pswd}
                            required
                            aria-invalid={validPswd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPswdFocus(true)}
                            onBlur={() => setPswdFocus(false)}
                        />
                        <p id="pwdnote" className={pswdFocus && !validPswd ? "instructions" : "offscreen"}>
                            <FaInfoCircle />
                            La contraseña debe tener entre 8 y 24 carácteres.<br />
                            Debe incluir al menos una letra mayuscula y minuscula, un numero, y un caracter especial.<br />
                            Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FaCheck className={validMatch && matchPswd ? "valid" : "hide"} />
                            <FaTimes className={validMatch || !matchPswd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            name="pswd"
                            onChange={(e) => setMatchPswd(e.target.value)}
                            value={matchPswd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FaInfoCircle  />
                            Las contraseñas introducidas no coinciden.
                        </p>

                        <button disabled={!validName || !validPswd || !validMatch ? true : false}>Registrar</button>
                        <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
        </form>
    </section>
      )}</>
  )
}

export default Register