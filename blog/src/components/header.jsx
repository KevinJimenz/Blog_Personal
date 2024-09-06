import { useState, useEffect } from 'react';
import logo from '../assets/media/logo-removebg-preview-removebg-preview.png'
import swal from 'sweetalert2'
import reactContent from 'sweetalert2-react-content'
/**
 * * swal, es el modulo principal de Sweetalert2
 * * reactContent, me permite renderizar contenido de react dentro del Sweetalert2
 */
const mySwal = reactContent(swal);
const Header = ({ setMain, setHeader, setProfileUser }) => {

    const fillProfile_user = (username, photo, email) => {
        setProfileUser(username, photo, email)
    }

    useEffect(() => {
        // Evento cuando el modal se cierra
        const modalElement = document.getElementById('modal_login');
        modalElement.addEventListener('hidden.bs.modal', () => {
            // Asegúrate de que se remuevan las clases que bloquean la interacción
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop')?.remove();

        })
    }, []);

    // * Form Sign-i / Login
    // Estado que almacene un objeto con el email y el password
    const [formDataLogin, setFormDataLogin] = useState({ email: "", password: "" });

    // * Form Sign-up / Register
    // Estado que almacene la informacion del formulario registro
    const [formDataRegister, setFormDataRegister] = useState({ name: "", email: "", pass: "" });

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

    const validateLogin = (data) => {
        const email = data.email;
        const pass = data.password;
        fetch(`https://apiblog-wj9s.onrender.com/validarCredenciales/users/${email}/${pass}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.rol === "admin") {
                    mySwal.fire({
                        title: '¡¡Bienvenido Señor Kevin!!',
                        icon: 'success',
                        confirmButtonText: 'Siguiente',
                        showCloseButton: true,
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                const name = data.username;
                                const pathPhoto = data.photo;
                                const email = data.email;
                                const namePhoto = pathPhoto.replace('uploads/', '');
                                fetch(`https://apiblog-wj9s.onrender.com/traerImagen/users/${namePhoto}`, {
                                    method: 'POST'
                                })
                                    .then((response) => {
                                        return response.blob();
                                    })
                                    .then((data) => {
                                        setHeader(true);
                                        setMain(true);
                                        const url = URL.createObjectURL(data);
                                        fillProfile_user(name, url, email);
                                    })
                            }
                        });
                }
                else if (data.rol === "user") {
                    mySwal.fire({
                        title: '¡¡Bienvenido a Drakkav!!',
                        icon: 'success',
                        confirmButtonText: 'Siguiente',
                        showCloseButton: true,
                    })
                    const name = data.username;
                    const pathPhoto = data.photo;
                    const email = data.email;
                    const namePhoto = pathPhoto.replace('uploads/', '');
                    fetch(`https://apiblog-wj9s.onrender.com/traerImagen/users/${namePhoto}`, {
                        method: 'POST'
                    })
                        .then((response) => {
                            return response.blob();
                        })
                        .then((data) => {
                            setHeader(true);
                            setMain(false);
                            const url = URL.createObjectURL(data);
                            fillProfile_user(name, url, email);
                        })
                }
                else {
                    mySwal.fire({
                        title: '¡¡Error!!',
                        text: 'No se encuenta registrado, vuelve a intentarlo.',
                        icon: 'error',
                        cancelButtonText: 'ok',
                        showCloseButton: true,
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
                    confirmButtonText: 'Siguiente',
                    showCloseButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "http://localhost:5173/";
                    }
                });
            })
    }

    return (
        <>
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
        </>
    )
}


export default Header;