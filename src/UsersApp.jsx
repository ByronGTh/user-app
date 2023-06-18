import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";

export const UsersApp = () =>{
    return(<div className="container my-4">
        <h2>User App</h2>
        <div className="row">
            <div className="col">
                <UsersList/>
            </div>
            <div className="col">
                <UserForm/>
            </div>
        </div>
    </div>);
}