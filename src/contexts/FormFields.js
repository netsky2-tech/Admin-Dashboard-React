const loginFields=[
    {
        labelText:"Nombre de usuario",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"off",
        isRequired:true,
        placeholder:"Digite un nombre de usuario",
        
    },
    {
        labelText:"Contraseña",
        labelFor:"contraseña",
        id:"pswd",
        name:"pswd",
        type:"password",
        autoComplete:"off",
        isRequired:true,
        placeholder:"Digite su contraseña",
        
    }
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }
]

export {loginFields,signupFields}
