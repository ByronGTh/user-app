export const UserRow = ({id, username, email}) =>{
    return(
        <tr>
            <td>{username}</td>
            <td>{email}</td>
            <td><button className="btn btn-warning btn-sm">Update</button></td>
            <td><button className="btn btn-danger btn-sm">Remove</button></td>
        </tr>
    );
}