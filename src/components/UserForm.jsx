import { useState } from "react";

const initialUserForm = {
    username: '',
    password: '',
    email: ''
}

export const UserForm = ()=>{

    
/*Guardando los datos del los inputs de los formularios en los estados de react, mapeando los valores
iniciales, desestructurandolos y pasandolos al hook useState y del useState al formulario por medio de la 
propiedad value
*/
    const[userForm, setUserForm] =useState(initialUserForm);

    //De esta desestructuracion pasan al value de los inputs
    const{username, password, email} = userForm;
    const onInputChange = ({target})=>{
        //Destructuracion del target
        const{name, value} = target;
        /*Creamos un elemento nuevo respetando la estructura y contenido que ya se pueda encontrar en el objero 
        userForm*/
        setUserForm({
            ...UserForm,
            [name]: value
        });
        console.log(target.value);
    }

    return(<>
        <p>Formulario de usuario</p>
        <form action="">
            <input type="text" className="form-control my-3 w-75" onChange={onInputChange} placeholder="User name" name="username" value={username}/>
            <input type="password" className="form-control my-3 w-75" onChange={onInputChange} placeholder="Password" name="password" value={password}/>
            <input type="email" className="form-control my-3 w-75" onChange={onInputChange} placeholder="Email" name="email" value={email}/>
            <button type="submit" className="btn btn-success">Crear usuario</button>
        </form>
    </>);
}