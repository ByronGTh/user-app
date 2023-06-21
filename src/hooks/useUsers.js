import { useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import Swal from "sweetalert2";

const initialUsers = [
    {
        id:1,
        username: 'Skibidi Dop',
        password: '12345s',
        email: 'skibididop@correo.com'
    }
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
}

export const useUsers = () => {
    const[users, dispatch] = useReducer(userReducer, initialUsers);
    const[userSelected, setUserSelected] = useState(initialUserForm);

    const handlerAddUser=(user)=>{
        //console.log(user);

        let type;
        if (user.id ===0) {
            type = 'AddUser';
        }else{
            type = 'UpdateUser';
        }

        dispatch(
            {
                type,
                payload: user
            }
        );

        Swal.fire(
            (user.id ===0) ? 'Usuario creado' : 'Usuario actualizado',
            (user.id ===0) ? 'El usuario a sido creado con exito' : 'El usuario a sido actualizado con exito',
            'success'
          )
    }

    const handlerRemoveUser = (id) =>{
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

    const handlerUserSelectedForm = (user) =>{
        //console.log(user);
        setUserSelected({...user});
    }

    return{
        users,
        userSelected,
        initialUserForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm
    };
}