import { useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";

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
    }

    const handlerRemoveUser = (id) =>{
       // console.log(id);
       dispatch({
        type: 'RemoveUser',
        payload: id
       });
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