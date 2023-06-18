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
    return(<div className="container my-4">
        <h2>User App</h2>
        <div className="row">
            <div className="col">
                <UserForm/>
            </div>
            <div className="col">
                <UsersList users={initialUsers}/>
            </div>
        </div>
    </div>);
}