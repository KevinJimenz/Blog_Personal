import { useState } from 'react';
import logo from '../assets/media/logo-removebg-preview-removebg-preview.png'
import swal from 'sweetalert2'
import reactContent from 'sweetalert2-react-content'
/**
 * * swal, es el modulo principal de Sweetalert2
 * * reactContent, me permite renderizar contenido de react dentro del Sweetalert2
 */
const mySwal = reactContent(swal); // Creo una instancia de Sweetalert2
const Header = ({ setMain, isHeader }) => {
    // Seteo el main, si es true muestra contenido para el Admin, si es falso le muestra el contenido a los usarios
    const handleMain = (isMain) => {
        setMain(isMain);
    };
    // ! Back
    // * Form Sign-in
    // Estado que almacene un objeto con el email y el password
    const [formDataLogin, setFormDataLogin] = useState({ email: "", password: "" });
    // Manejo el cambio de valores que tiene los inputs 
    const changeValueLogin = (e) => {
        // Variables que almacenan el id y el value de los input
        const key = e.target.id;
        const value = e.target.value;
        // Seteo los datos del formData
        setFormDataLogin({ ...formDataLogin, [key]: value });
    };
    // Manejador que envia los datos del formData a una funcion 
    const dataLogin = (e) => {
        e.preventDefault(); // Evito que por defecto se actulice la pagina
        validateLogin(formDataLogin);
    };
    /**
     * @param {object} data, son los datos que recibe del estado 
     */
    const validateLogin = (data) => {
        const email = data.email;
        const pass = data.password;
        fetch(`https://api-blog-personal.onrender.com/buscarUsuario/users/${email}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.message == "Exists") {
                    // Valido si es Admin o Usuario
                    if (data.email_address == "kevincamilo56@gmail.com") {
                        mySwal.fire({
                            title: '¡¡Bienvenido Señor Kevin!!',
                            icon: 'success',
                            confirmButtonText: 'Siguiente'
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    handleMain(true)
                                }
                            });
                    } else {
                        fetch(`https://api-blog-personal.onrender.com/validarCredenciales/users/${email}/${pass}`)
                            .then((response) => {
                                return response.json()
                            })
                            .then((data) => {
                                if (data.message == "Correct Credentials") {
                                    mySwal.fire({
                                        title: '¡¡Bienvenido a Drakkav!!',
                                        text: 'En este blog podras ver y compartir tus comentarios acerca de diferentes temas.',
                                        icon: 'success',
                                        confirmButtonText: 'Siguiente'
                                    })
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                // redireccino a la pagina pero ya logueado
                                                window.location.href = "http://localhost:5173/";
                                            }
                                        });
                                }
                                else {
                                    mySwal.fire({
                                        title: '¡¡Error!!',
                                        text: data.message + ' ' + 'vuelve a intentarlo.',
                                        icon: 'error',
                                        cancelButtonText: 'ok'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            // redireccino a la pagina de inicio para que se loguee
                                            window.location.href = "http://localhost:5173/";
                                        }
                                    });
                                }
                            })
                    }
                }
                else {
                    mySwal.fire({
                        title: '¡¡Error!!',
                        text: data.message + ' ' + 'vuelve a intentarlo.',
                        icon: 'error',
                        cancelButtonText: 'ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // redireccino a la pagina de inicio para que se loguee
                            window.location.href = "http://localhost:5173/";
                        }
                    });
                }
            })
    };

    // * Form Sign-up
    // Estado que almacene la informacion del formulario registro
    const [formDataRegister, setFormDataRegister] = useState({ name: "", email: "", pass: "" });
    // Manejo el cambio de valores que tiene los inputs 
    const changeValueRegister = (e) => {
        // Variables que almacenan el id y el value de los input
        const key = e.target.id;
        const value = e.target.value;
        // Seteo los datos del formData
        setFormDataRegister({ ...formDataRegister, [key]: value });
    };
    // Manejador que envia los datos del formData a una funcion 
    const dataRegister = (e) => {
        e.preventDefault(); // Evito que por defecto se actulice la pagina
        validateRegister(formDataRegister);
    };
    /**
     * @param {object} data, son los datos que recibe del estado 
     */
    const validateRegister = (data) => {
        // Recibo el valor que tenga el input con tipo 'file'
        const fileInput = document.querySelector('input[type="file"]');
        // Variables para mejor lectura
        const name = data.name;
        const email = data.email;
        const pass = data.pass;
        // Creo un formData y le agrego el archivo del input
        const formData = new FormData();
        formData.append('photo', fileInput.files[0]); 
        const url = `https://api-blog-personal.onrender.com/crear/users/${name}/${email}/${pass}`
        fetch(url, {
            method: 'POST', body: formData
        })
            .then((response) => {
                return response.json;
            })
            .then((data) => {
                console.log(data)
                mySwal.fire({
                    title: '¡¡Felicidades!!',
                    text: 'Te has registrado al blog.',
                    icon: 'success',
                    confirmButtonText: 'Siguiente'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // redireccino a la pagina de inicio para que se loguee
                        window.location.href = "http://localhost:5173/";
                    }
                });
            })

    }
    // ! Front
    return (
        <>
            <div>
                {!isHeader ? (
                    <div className="contenedor_header">
                        <div className="logo">
                            <img src={logo} alt="DraKKav" />
                        </div>
                        <div className="items">
                            <div className="search_bar">
                                <input type="search" placeholder="Search" aria-label="Search" />
                            </div>
                            <div className="buttons">
                                <button type="button" className="btn_login" data-bs-toggle="modal" data-bs-target="#modal_login">Login</button>
                                <button type="button" className="btn_register" data-bs-toggle="modal" data-bs-target="#modal_register">Register</button>
                            </div>
                        </div>

                        <div className="modal fade" id="modal_login" >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Login</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="form" onSubmit={dataLogin}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="email" onChange={changeValueLogin} aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="password" onChange={changeValueLogin} />
                                            </div>
                                            <div className="btn_form">
                                                <button type="submit" >Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="modal_register" >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Register</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="form" onSubmit={dataRegister} encType="multipart/form-data">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="name" onChange={changeValueRegister} aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                                                <input type="Email" className="form-control" id="email" onChange={changeValueRegister} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                                <input type="text" className="form-control" id="pass" onChange={changeValueRegister} aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Photo</label>
                                                <input type="file" className="form-control" name='photo' onChange={changeValueRegister} />
                                            </div>
                                            <div className="btn_form">
                                                <button type="submit">Sign Up</button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="contenedor_header">
                        <div className="logo">
                            <img src={logo} alt="DraKKav" />
                        </div>
                        <div className="items">
                            <div className="search_bar">
                                <input type="search" placeholder="Search" aria-label="Search" />
                            </div>
                            <div className="user">
                                <div className="user_name">
                                    <p>User Name</p>
                                </div>
                                <div className="user_image">

                                    <img src={logo} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="modal_login" >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Gestion del Blog</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className='textAdmin'>En este apartado podra gestionar la informacion del blog.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </>
    )
}


export default Header;