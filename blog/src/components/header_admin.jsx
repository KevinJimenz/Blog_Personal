import { useState, useEffect } from 'react';
import logo from '../assets/media/logo-removebg-preview-removebg-preview.png'
import swal from 'sweetalert2'
import reactContent from 'sweetalert2-react-content'
/**
 * * swal, es el modulo principal de Sweetalert2
 * * reactContent, me permite renderizar contenido de react dentro del Sweetalert2
 */
const mySwal = reactContent(swal);
const Header_Admin = ({userName, userPhoto, isAdmin}) => {
    
    useEffect(() => {
        // Simula el clic en el botón cuando el componente carga
        document.querySelector('.btn_login').click();
           // Evento cuando el modal se cierra
           const modalElement = document.getElementById('modal_login');
           modalElement.addEventListener('hidden.bs.modal', () => {
               // Asegúrate de que se remuevan las clases que bloquean la interacción
               document.body.classList.remove('modal-open');
               document.querySelector('.modal-backdrop')?.remove();
               document.body.style.overflow = '';
           })
    }, []); // El array vacío asegura que esto se ejecute solo una vez cuando el componente se monte

    // funcion para cerrar sesion
    const cerrarSesion = () => {
        window.location.href = 'http://localhost:5173/';
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
                    <div className="user">
                        <div className="user_name">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#modal_logout">{userName}</button>

                        </div>
                        <div className="user_image"> 
                            <img src={userPhoto} alt="" ></img>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn_login" onc data-bs-toggle="modal" hidden data-bs-target="#modal_login"></button>

                    <div className="modal fade" id="modal_login" >
                        <div className="modal-dialog">
                            {isAdmin? (  
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Gestion del Blog</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className='textAdmin'>En este apartado podra gestionar la informacion del blog.</p>
                                    </div>
                                </div>
                            ):(   
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Bienvenido!!!</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className='textAdmin'>En este apartado podras ver y comentar sobre diferentes publicaciones.</p>
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

        </>
    )
}


export default Header_Admin;