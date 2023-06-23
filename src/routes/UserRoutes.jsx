import { Navigate, Route, Routes } from "react-router-dom";

export const UserRoutes =({login, handlerLogout})=>{
    return(<>
        <Navbar login={login} handlerLogout={handlerLogout}/>
        <Routes>
            <Route path="users" element={<UsersPage/>}/>
            <Route path="/" element={<Navigate to="/users"/>}/>
        </Routes>
    </>);
}