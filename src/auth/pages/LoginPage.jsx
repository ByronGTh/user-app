import { useState } from "react";
import Swal from "sweetalert2";

const initialLoginForm = {
    username: '',
    password: ''
}

export const LoginPage = () => {
    const[loginForm, setLoginForm] = useState(initialLoginForm);
    const{username, password} = loginForm;

    //Funcion que extrae la informacion de los inputs del formulario
    const onInputChange = ({target}) =>{
        const{name, value} = target;
        setLoginForm({
            ...loginForm,
            [ name ]: value,
        });
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
        }

        //TODO: Implementar uso de credenciales de login
        if (username === 'admin' && password ==='12345') {
            //TODO: handlerLogin();
        } else {
            Swal.fire('Error Login', 'Username o password invalidos', 'error');
        }

        setLoginForm(initialLoginForm);
    }

    return (
        <div className="container">
            <div className="card">
                <h5 className="card-header">Sistema de verificacion</h5>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <input className="form-control my-3 w-75" type="text" name="username" placeholder="Username" value={username} onChange={onInputChange}/>
                        <input className="form-control my-3 w-75" type="password" name="password" placeholder="Password" value={password} onChange={onInputChange}/>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>

    );
}