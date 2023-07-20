import axios from "axios"

const URL_BACKEND = "http://localhost:8080/users";

const config = () => {
   return {
        headers:{
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json"
        }
    }
}

export const findAll = async () =>{
    try {
        const response = await axios.get(URL_BACKEND);
        return response;        
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const save = async ({ username, email, password, admin }) => {
    try {
        return await axios.post(URL_BACKEND, {username, email, password, admin}, config());
    } catch (error) {
        throw error; //lanza o envia el error al useUsers
        //console.error(error);
    }
}

export const update = async ({ id, username, email, admin }) => {
    try {
        return await axios.put(`${URL_BACKEND}/${id}`, { username, email, admin }, config());
    } catch (error) {
        throw error;
        //console.error(error);
    }
}

export const remove = async (id) => {
    try {
        await axios.delete(`${URL_BACKEND}/${id}`, config());
    } catch (error) {
        throw error;
        //console.error(error);
    }
}