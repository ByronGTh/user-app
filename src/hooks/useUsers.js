import Swal from "sweetalert2";
import { findAll, remove, save, update } from "../services/userService";
import { useAuth } from "../auth/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { initialUserForm, addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm, loadingError } from "../store/slices/users/usersSlice";

/*const initialUsers = [];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false
}*/

//Almacenara los errores enviados por en userService en formato JSON
/*const initialErrors = {
    username: '',
    password: '',
    email: ''
}*/

export const useUsers = () => {
    const { login, handlerLogout } = useAuth();

    const {users, userSelected, errors} = useSelector( state => state.users );
    //const [users, dispatch] = useReducer(userReducer, initialUsers);
    const dispatch = useDispatch();

    //const [userSelected, setUserSelected] = useState(initialUserForm);
    //const [errors, setErrors] = useState(initialErrors);

    const getUsers = async () => {
        const result = await findAll();
        dispatch (loadingUsers(result.data) );
    }

    const handlerAddUser = async (user) => {
        //console.log(user);
        let response;

        //Capturando los valores del error con el try
        try {

            let type;
            if (user.id === 0) {
                type = 'AddUser';
                response = await save(user);
                dispatch(addUser( response.data ));
            } else {
                type = 'UpdateUser';
                response = await update(user);
                dispatch( updateUser( response.data ) );
            }

            Swal.fire(
                (user.id === 0) ? 'Usuario creado' : 'Usuario actualizado',
                (user.id === 0) ? 'El usuario a sido creado con exito' : 'El usuario a sido actualizado con exito',
                'success'
            )
            //setUserSelected(initialUserForm);
            dispatch( loadingError( {} ) );
            
            //TODO: Validar limpieza del formulario

        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch( loadingError(error.response.data) );
            }else if(error.response && error.response.status == 500 && error.response.data?.message?.includes('constraint')){
                if (error.response.data?.message?.includes('username_UNIQUE')) {
                    dispatch( loadingError({username: 'El nombre de usuario ya esta registrado, favor escoger otro'}) );
                }
                if (error.response.data?.message?.includes('email_UNIQUE')) {
                    dispatch( loadingError({email: 'El correo electronico ya esta registrado, favor escoger otro'}) );
                }
            }else if(error.response?.status == 401){
                    handlerLogout();
            }else {
                throw error;
            }
        }
    }

    const handlerRemoveUser = (id) => {
        // console.log(id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( async(result) => {
            if (result.isConfirmed) {
                try {
                   await remove(id);
                   dispatch( removeUser( id ) );
                    Swal.fire(
                        'Usuario eliminado!',
                        'Usuario eliminado con exito.',
                        'success'
                    );
                    
                } catch (error) {
                    if(error.response?.status == 401){
                        handlerLogout();
                    }
                }
            }
        })
    }

    const handlerUserSelectedForm = (user) => {
        //console.log(user);
        //setUserSelected({ ...user });
        dispatch( onUserSelectedForm( { ...user } ) );
    }

    return {
        users,
        userSelected,
        initialUserForm,
        errors,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        getUsers
    };
}