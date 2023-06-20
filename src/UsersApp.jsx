import { useReducer } from "react";
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

export const UsersApp = () =>{

    const[users, dispatch] = useReducer(userReducer, initialUsers);
    const handlerAddUser=(user)=>{
        //console.log(user);
        dispatch(
            {
                type: 'AddUser',
                payload: user
            }
        );
    }

    return(<div className="container my-4">
        <h2>User App</h2>
        <div className="row">
            <div className="col">
                <UserForm handlerAddUser={handlerAddUser}/>
            </div>
            <div className="col">
                <UsersList users={users}/>
            </div>
        </div>
    </div>);
}