import { useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import Swal from "sweetalert2";
import { findAll, remove, save, update } from "../services/userService";

const initialUsers = [];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
}

//Almacenara los errores enviados por en userService en formato JSON
const initialErrors = {
    username: '',
    password: '',
    email: ''
}

export const useUsers = () => {
    const [users, dispatch] = useReducer(userReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [errors, setErrors] = useState(initialErrors);

    const getUsers = async () => {
        const result = await findAll();
        dispatch({
            type: 'cargandoUsuarios',
            payload: result.data,
        });
    }

    const handlerAddUser = async (user) => {
        //console.log(user);

        //Capturando los valores del error con el try
        try {



            let response;

            let type;
            if (user.id === 0) {
                type = 'AddUser';
                response = await save(user);
            } else {
                type = 'UpdateUser';
                response = await update(user);
            }

            dispatch(
                {
                    type,
                    payload: response.data
                }
            );

            Swal.fire(
                (user.id === 0) ? 'Usuario creado' : 'Usuario actualizado',
                (user.id === 0) ? 'El usuario a sido creado con exito' : 'El usuario a sido actualizado con exito',
                'success'
            )

        } catch (error) {

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
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id);
                dispatch({
                    type: 'RemoveUser',
                    payload: id
                });
                Swal.fire(
                    'Usuario eliminado!',
                    'Usuario eliminado con exito.',
                    'success'
                )
            }
        })
    }

    const handlerUserSelectedForm = (user) => {
        //console.log(user);
        setUserSelected({ ...user });
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