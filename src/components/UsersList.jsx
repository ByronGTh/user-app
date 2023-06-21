import { UserRow } from "./UserRow";

export const UsersList = ({handlerUserSelectedForm, handlerRemoveUser, users})=>{
    return(<>
        <p>Lista de usuarios</p>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map(({id, username, password, email})=>(
                    <UserRow key={id} id={id} username={username} password={password} email={email} 
                    handlerRemoveUser={handlerRemoveUser} handlerUserSelectedForm={handlerUserSelectedForm}/>
                ))}
            </tbody>
        </table>
    </>);
}