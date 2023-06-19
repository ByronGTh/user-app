import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";

export const UsersApp = () =>{
    const initialUsers = [
        {
            id:1,
            username: 'Skibidi Dop',
            password: '12345s',
            email: 'skibididop@correo.com'
        }
    ];

    const handlerAddUser=(user)=>{
        console.log(user);
    }

    return(<div className="container my-4">
        <h2>User App</h2>
        <div className="row">
            <div className="col">
                <UserForm handlerAddUser={handlerAddUser}/>
            </div>
            <div className="col">
                <UsersList users={initialUsers}/>
            </div>
        </div>
    </div>);
}