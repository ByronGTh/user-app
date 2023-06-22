import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";

/*Con el JSON.parse convirtiendo STRING a objeto
                    y
con el sessionStorage.getItem matenemos la secion 
que se abrio en el login para que no se pierda al 
acturalizar la vista
*/
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined
}

export const useAuth = () => {

    const[login, dispatch] = useReducer(loginReducer, initialLogin);
    const handlerLogin = ({username, password}) => {
        if (username === 'admin' && password ==='12345') {
            const user = {username: 'admin'};
            dispatch({
                type: 'login',
                payload: user
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user
            }));
        } else {
            Swal.fire('Error Login', 'Username o password invalidos', 'error');
        }
    }

    /**
     * Eliminando la session del navegador
     */
    const handlerLogout =()=>{
        dispatch({
            type: 'logout'
        });
        sessionStorage.removeItem('login');
    }

    return {
        login,
        handlerLogin,
        handlerLogout
    };
}