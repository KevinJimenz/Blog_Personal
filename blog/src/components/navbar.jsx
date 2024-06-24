import logo from '../assets/media/Logo-removebg-preview.png'
const Navbar = () => {
    return (
        <div className="nav">
            <div className="logo">
                <img src={logo} className="imagen"/>
                <h1 className="title">
                    Showing Da Rules
                </h1>
            </div>
            <div className="botones">
                <buttton type="button" className="btn_IniciarSesion">
                    Iniciar Sesion
                </buttton>
                <buttton type="button" className="btn_Registrarse">
                    Registrarse
                </buttton>
            </div>
        </div>
    )
}

export default Navbar;