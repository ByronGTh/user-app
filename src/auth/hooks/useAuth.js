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
    isAdmin: false,
    user: undefined
}

export const useAuth = () => {

    const[login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async({username, password}) => {

        //Separando la logica de como se realiza la autentificacion
        
        try {
            const response = await loginUser({username, password});
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            const user = {username: response.data.username};
            dispatch({
                type: 'login',
                payload: {user, isAdmin: claims.isAdmin}
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/users');
        } catch(error) {
            if (error.response?.status == 401) {
                Swal.fire('Error Login', 'Username o password invalidos', 'error');
            } else if(error.response?.status == 403){
                Swal.fire('Error Login', 'No cuenta con permisos para acceder al recurso solicitado!', 'error');
            }else{
                throw error;
            }
        }
    }

    /**
     * Eliminando la session del navegador
     */
    const handlerLogout =()=>{
        dispatch({
            type: 'logout'
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear;
    }

    return {
        login,
        handlerLogin,
        handlerLogout
    };
}