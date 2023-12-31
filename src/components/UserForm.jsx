import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";

export const UserForm = ({userSelected, initialUserForm, handlerAddUser, errors})=>{

    
/*Guardando los datos del los inputs de los formularios en los estados de react, mapeando los valores
iniciales, desestructurandolos y pasandolos al hook useState y del useState al formulario por medio de la 
propiedad value
*/
    const[userForm, setUserForm] =useState(initialUserForm);

    const[checked, setChecked] = useState(userForm.admin);

    //De esta desestructuracion pasan al value de los inputs
    const{id, username, password, email, admin} = userForm;

    /*
        Por medio de este useEffect() haremos que el formulario se poble de la informacion de la fila de la tabla
        al tocar el boton de acutualizar debido a que estamos indicando en el corchete que cuando algo se encuentre
        en el userSelected que nos dara como reultado un cambio de estado de vacio a tener informacion

     */

    //const {initialUserForm, handlerAddUser, errors} = useUsers(); //AGREGAR LUEGO ESTO SI NOS DA ERROR AL EJECUTAR FRONTED
    useEffect(()=>{
        setUserForm({
            ...userSelected,
            password: '' //QUITAR ESTO, SE DEJO YA QUE LO VI EN EL VIDEO DE EJEMPLO PERO COMO LO TENIA NO ESTABA
        })
    },[userSelected]);

    const onInputChange = ({target})=>{
        //Destructuracion del target
        const{name, value} = target;
        /*Creamos un elemento nuevo respetando la estructura y contenido que ya se pueda encontrar en el objero 
        userForm*/
        setUserForm({
            ...userForm,
            [name]: value
        });
        //console.log(target.value);
    }

    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm({
            ...userForm,
            admin: checked
        });
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        /*if(!username || (!password && id === 0) || !email){
            Swal.fire(
                'Error de validacion',
                'Debe de llenar los campos del formulario',
                'error'
              );
            return;
        }*/

        handlerAddUser(userForm);

        //Vaciar los inputs y dejarlos con el estado de inicio que se encuentran el en metodo
        //setUserForm(initialUserForm);

        //Verificando que se esta enviando el objeto correctamente en el submit
        //console.log(userForm);
    }

    return(<>
        <p>Formulario de usuario</p>
        <form onSubmit={onSubmit}>
            <input type="text" className="form-control my-3 w-75" onChange={onInputChange} placeholder="User name" name="username" value={username}/>
            <p className="text-danger">{errors?.username}</p>
            {id > 0 || <input type="password" className="form-control my-3 w-75" onChange={onInputChange} placeholder="Password" name="password" value={password}/>}
            <p className="text-danger">{errors?.password}</p>
            <input type="email" className="form-control my-3 w-75" onChange={onInputChange} placeholder="Email" name="email" value={email}/>
            <p className="text-danger">{errors?.email}</p>
            <div className="my-3 form-check"><input type="checkbox" name="admin" checked={admin} className="form-check-input" onChange={onCheckboxChange} /></div>
            <button type="submit" className="btn btn-success" onSubmit={onSubmit}>{id > 0 ? 'Editar' : 'Crear nuevo usuario'}</button>
        </form>
    </>);
}