export const UserRow = ({handlerRemoveUser, id, username, email}) =>{
    const onRemoveUser = (id) =>{
        handlerRemoveUser(id);
    }
    return(
        <tr>
            
            <td>{username}</td>
            <td>{email}</td>
            <td><button className="btn btn-warning btn-sm">Update</button></td>
            <td><button className="btn btn-danger btn-sm" onClick={ ()=>onRemoveUser(id) }>Remove</button></td>
        </tr>
    );
}