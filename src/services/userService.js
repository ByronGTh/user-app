import axios from "axios"

const URL_BACKEND = "http://localhost:8080/users";
export const findAll = async () =>{
    try {
        const response = await axios.get(URL_BACKEND);
        return response;        
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const save = async ({ username, email, password }) => {
    try {
        return axios.post(URL_BACKEND, {username, email, password});
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

export const update = async ({ id, username, email }) => {
    try {
        return axios.put(`${URL_BACKEND}/${id}`, { username, email });
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

export const remove = async (id) => {
    try {
        await axios.delete(`${URL_BACKEND}/${id}`);
    } catch (error) {
        console.error(error);
    }
}