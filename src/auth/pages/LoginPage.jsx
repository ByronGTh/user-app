export const LoginPage = () => {
    return (
        <div className="container">
            <div className="card">
                <h5 className="card-header">Sistema de verificacion</h5>
                <div className="card-body">
                    <input className="form-control my-3 w-75" type="text" name="username" placeholder="Username" />
                    <input className="form-control my-3 w-75" type="password" name="password" placeholder="Password" />
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </div>
        </div>

    );
}