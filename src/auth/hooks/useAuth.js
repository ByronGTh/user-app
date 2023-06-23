import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
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
    const navigate = useNavigate();

    const handlerLogin = ({username, password}) => {

        //Separando la logica de como se realiza la autentificacion
        const isLogin = loginUser({username, password});

        if (isLogin) {
            const user = {username: 'admin'};
            dispatch({
                type: 'login',
                payload: user
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user
            }));
            navigate('/users');
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