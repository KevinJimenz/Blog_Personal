import { useState } from 'react';
import logo from '../assets/media/logo-removebg-preview-removebg-preview.png'
import swal from 'sweetalert2'
import reactContent from 'sweetalert2-react-content'
/**
 * * swal, es el modulo principal de Sweetalert2
 * * reactContent, me permite renderizar contenido de react dentro del Sweetalert2
 */
const mySwal = reactContent(swal); 
const Header = ({ setMain, isHeader, setHeader, setInfoUser, nameUser, photoUser }) => {
    // Estado para saber si es admin o user
    const [isAdmin, setAdmin] = useState(false);
    
    // * Form Sign-i / Login
    // Estado que almacene un objeto con el email y el password
    const [formDataLogin, setFormDataLogin] = useState({ email: "", password: "" });

        // Manejo el cambio de valores que tiene los inputs 
        const changeValueLogin = (e) => {
            const key = e.target.id;
            const value = e.target.value;
            setFormDataLogin({ ...formDataLogin, [key]: value });
        };
        const dataLogin = (e) => {
            e.preventDefault(); // Evito que por defecto se actulice la pagina
            validateLogin(formDataLogin);
        };
    
    // * Form Sign-up / Register
    // Estado que almacene la informacion del formulario registro
    const [formDataRegister, setFormDataRegister] = useState({ name: "", email: "", pass: "" });

    // Manejo el cambio de valores que tiene los inputs 
        const changeValueRegister = (e) => {
            const key = e.target.id;
            const value = e.target.value;
            setFormDataRegister({ ...formDataRegister, [key]: value });
        };
        const dataRegister = (e) => {
            e.preventDefault(); // Evito que por defecto se actulice la pagina
            validateRegister(formDataRegister);
        };
    
    // Manejadors para setear el Main si es admin o user
    const handleMain = (isMain) => {
        setMain(isMain);
    };
    // Manejador para setear el Header si es admin o user
    const handleHeader = (isUser) => {
        setHeader(isUser)
    };
    // funcion para poner el nombre y la imagen del usuario cuando se loguee
    const fillDataUser = (name, photo) => {
        setInfoUser(name, photo)
    }
    // funcion para cerrar sesion
    const cerrarSesion = () => {
        window.location.href = 'http://localhost:5173/';
    }

    const validateLogin = (data) => {
        const email = data.email;
        const pass = data.password;
        fetch(`https://apiblog-wj9s.onrender.com/validarCredenciales/users/${email}/${pass}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.rol == "admin") {
                    mySwal.fire({
                        title: '¡¡Bienvenido Señor Kevin!!',
                        icon: 'success',
                        confirmButtonText: 'Siguiente'
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                // le cambio el contenido principal y el header
                                handleMain(true)
                                setAdmin(true)
                                const name = data.username;
                                const pathPhoto = data.photo;
                                const namePhoto = pathPhoto.replace('uploads/', '');
                                fetch(`https://apiblog-wj9s.onrender.com/traerImagen/users/${namePhoto}`, {
                                    method: 'POST'
                                })
                                    .then((response) => {
                                        return response.blob();
                                    })
                                    .then((data) => {
                                        // Creo la ruta de la imagen
                                        const url = URL.createObjectURL(data)
                                        fillDataUser(name, url);
                                    })
                            }
                        });
                }
                else if (data.rol == "user") {
                    mySwal.fire({
                        title: '¡¡Bienvenido a Drakkav!!',
                        icon: 'success',
                        confirmButtonText: 'Siguiente'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleHeader(true);
                            setAdmin(false);
                            const name = data.username;
                            const pathPhoto = data.photo;
                            const namePhoto = pathPhoto.replace('uploads/', '');
                            fetch(`https://apiblog-wj9s.onrender.com/traerImagen/users/${namePhoto}`, {
                                method: 'POST'
                            })
                                .then((response) => {
                                    return response.blob();
                                })
                                .then((data) => {
                                    const url = URL.createObjectURL(data)
                                    fillDataUser(name, url);
                                })

                        }
                    });
                }
                else {
                    mySwal.fire({
                        title: '¡¡Error!!',
                        text: 'No se encuenta registrado, vuelve a intentarlo.',
                        icon: 'error',
                        cancelButtonText: 'ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "http://localhost:5173/";
                        }
                    });
                }
            })
    };

    const validateRegister = (data) => {
        const name = data.name;
        const email = data.email;
        const pass = data.pass;
        // Llamo el formulario register para obtener la imagen
        form = document.getElementById('form');
        const formData = new FormData(form);
        const url = `https://apiblog-wj9s.onrender.com/crear/users/${name}/${email}/${pass}`
        fetch(url, {
            method: 'POST', body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                mySwal.fire({
                    title: '¡¡Felicidades!!',
                    text: 'Te has registrado al blog.',
                    icon: 'success',
                    confirmButtonText: 'Siguiente'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "http://localhost:5173/";
                    }
                });
            })
    }

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
                                        <form className="form" onSubmit={dataLogin} encType="multipart/form-data">
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
                                        <form className="form" id='form' onSubmit={dataRegister} encType="multipart/form-data">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="name" onChange={changeValueRegister} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                                                <input type="Email" className="form-control" id="email" onChange={changeValueRegister} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                                <input type="text" className="form-control" id="pass" onChange={changeValueRegister} />
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
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#modal_logout">{nameUser}</button>

                                </div>
                                <div className="user_image">
                                    <img src={photoUser} alt="" ></img>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="modal_login" >
                            <div className="modal-dialog">
                                {isAdmin ? (
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Gestion del Blog</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p className='textAdmin'>En este apartado podra gestionar la informacion del blog.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Contenido del blog</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p className='textAdmin'>En este blog podras ver y compartir tus comentarios acerca de diferentes temas.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal fade" id="modal_logout" >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Cerrar Sesión</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className='textAdmin'>¿Seguro que quieres cerrar sesión?</p>
                                        <div className="btn_form">
                                            <button type="button" onClick={cerrarSesion} >Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}


export default Header;