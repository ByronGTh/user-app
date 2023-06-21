import { useEffect, useReducer, useState } from "react";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { userReducer } from "./reducers/userReducer";

const initialUsers = [
    {
        id:1,
        username: 'Skibidi Dop',
        password: '12345s',
        email: 'skibididop@correo.com'
    }
];

const initialUserForm = {
    username: '',
    password: '',
    email: ''
}

export const UsersApp = () =>{

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

    return(<div className="container my-4">
        <h2>User App</h2>
        <div className="row">
            <div className="col">
                <UserForm handlerAddUser={handlerAddUser} initialUserForm={initialUserForm} userSelected={userSelected}/>
            </div>
            <div className="col">
                {
                    users.length === 0 ?
                        <div className="alert alert-warning">No hay usuarios registrados en el sistema</div>
                    :
                    <UsersList users={users} handlerRemoveUser={handlerRemoveUser} handlerUserSelectedForm={handlerUserSelectedForm}/>
                }
            </div>
        </div>
    </div>);
}