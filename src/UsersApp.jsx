import { LoginPage } from "./auth/pages/LoginPage";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";

export const UsersApp = () =>{

    const {
        users,
        userSelected,
        initialUserForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm
    } = useUsers();

    return(<div className="container my-4">
        <h2>User App</h2>
        <div className="row">
            <div className="col">
                <UserForm handlerAddUser={handlerAddUser} initialUserForm={initialUserForm} 
                userSelected={userSelected}/>
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