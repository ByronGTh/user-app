import { useUsers } from "../hooks/useUsers";

export const UserRow = ({id, username, password, email, admin}) =>{ //Quitados handlerUserSelectedForm, handlerRemoveUser

    //TODO: eliminar password de los props

    const { handlerUserSelectedForm, handlerRemoveUser } = useUsers();
    return(
        <tr>
            <td>{username}</td>
            <td>{email}</td>
            <td><button className="btn btn-warning btn-sm" onClick={()=>handlerUserSelectedForm({id, username, password, email, admin})}>Update</button></td>
            <td><button className="btn btn-danger btn-sm" onClick={ ()=>handlerRemoveUser(id) }>Remove</button></td>
        </tr>
    );
}