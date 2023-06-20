import { UserRow } from "./UserRow";

export const UsersList = ({handlerRemoveUser, users})=>{
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
                {users.map(({id, username, email})=>(
                    <UserRow key={id} username={username} email={email} handlerRemoveUser={handlerRemoveUser}/>
                ))}
            </tbody>
        </table>
    </>);
}