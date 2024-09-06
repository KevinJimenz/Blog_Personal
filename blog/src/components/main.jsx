import { useState, useEffect } from "react";
import swal from "sweetalert2";
import reactContent from "sweetalert2-react-content";
/**
 * * swal, es el modulo principal de Sweetalert2
 * * reactContent, me permite renderizar contenido de react dentro del Sweetalert2
 */
const mySwal = reactContent(swal);
const Main = ({ islogin, email_user, username }) => {

    const [detailPublication, setDetailPublication] = useState([]); // Estado para almacenar el detalle de las publicaciones

    // Funcion para recargar los comentarios
    const reloadComments = () => {
        fetch(`https://apiblog-wj9s.onrender.com/TraerDetalle/detailPublication`)
            .then((response) => response.json())
            .then((data) => {
                setDetailPublication(data.list)
            })
    }

    const [publications, setPublications] = useState([]); // Estado para almacenar las publicaciones

    // Funcion que recarga el contenedor en donde se muestran las publicaciones
    const reloadContainer = () => {
        fetch(`https://apiblog-wj9s.onrender.com/listar/publication`)
            .then((response) => response.json())
            .then((data) => {
                setPublications(data.list);
                sendImage(data.list)
            });
    }
    // Uso un useEffect para que solo se renderice una vez 
    useEffect(() => {
        reloadComments();
        reloadContainer();
    }, [])

    const [photoUrls, setPhotoUrls] = useState([]); // Estado para almacenar las url de las imagenes de las publicaciones
    const sendImage = (image) => {
        // Recorro el arreglo y obtengo solo el nombre de la imagen
        for (let index = 0; index < image.length; index++) {
            const namePhoto = image[index].photo.replace("uploads/publications/", "");
            fetch(`https://apiblog-wj9s.onrender.com/traerFoto/publication/${namePhoto}`, {
                method: 'POST',
            })
                .then((response) => {
                    return response.blob();
                })
                .then((data) => {
                    const url = URL.createObjectURL(data);
                    setPhotoUrls((prevUrls) => ({ ...prevUrls, [image[index].id]: url }));
                })
        }
    }

    const [selectedPublicationId, setSelectedPublicationId] = useState(null);
    const [isComment, setComment] = useState(false);
    const comments = (idPublication) => {
        if (islogin) {
            setComment(prevState => ({
                ...prevState,
                [idPublication]: !prevState[idPublication] // Alterna el estado de visibilidad para la publicacion específica
            }));
            setSelectedPublicationId(idPublication);
        }
        else {
            mySwal.fire({
                title: "¡¡Error!!",
                text: "Necesitas loguearte para ver o comentar esta publicacion",
                icon: "error",
                confirmButtonText: "Ok",
                showCloseButton: true,
            })
        }
    }

    const [formData, setFormData] = useState({ comment: "" });

    // Manejo el cambio de valores que tiene los inputs 
    const changeValue = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setFormData({ ...formData, [key]: value });
    };
    const sendData = (e) => {
        e.preventDefault(); // Evito que por defecto se actulice la pagina
        addComment({ id: selectedPublicationId, formData });
    };

    const addComment = (data) => {
        const idPublication = data.id;
        const comment = data.formData.comment;
        const email = email_user;
        // Primero traigo el id del usuario
        fetch(`https://apiblog-wj9s.onrender.com/traerIdUser/users/${email}`, {
            method: 'POST'
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const idUser = data.idUser;
                // agregar comentario
                fetch(`https://apiblog-wj9s.onrender.com/crear/comments/${comment}/${idUser}`, {
                    method: 'POST'
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        const idComment = data.newComment.id
                        fetch(`https://apiblog-wj9s.onrender.com/crear/detailPublication/${idComment}/${idPublication}`, {
                            method: "POST"
                        })
                            .then((response) => {
                                return response.json()
                            })
                            .then((data) => {
                                if (data.status == "OK") {
                                    mySwal.fire({
                                        text: 'Comentario guardado correctamente',
                                        icon: 'success',
                                        confirmButtonText: 'Siguiente',
                                        showCloseButton: true,
                                    })
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                let text = document.getElementById('comment')
                                                text.value = ""
                                                reloadComments();
                                            }
                                        });
                                }
                                else {
                                    mySwal.fire({
                                        text: 'Hubo un error',
                                        icon: 'error',
                                        confirmButtonText: 'Siguiente',
                                        showCloseButton: true,
                                    })
                                }
                            })
                    })
            })
    }

    const [boton, setBoton] = useState(false);
    const [formEdit, setFormEdit] = useState({ id: "", comment: "" })
    const catchOldComment = (id, comment) => {
        let text = document.getElementById('comment')
        text.value = comment;
        formEdit.id = id
        setBoton(true);
    }

    const changeValueEdit = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setFormEdit({ ...formEdit, [key]: value });
    }

    const sendDataEdit = (e,) => {
        e.preventDefault()
        editComment(formEdit)
    }

    const editComment = (data) => {
        const idComment = data.id
        const comment = data.comment
        fetch(`https://apiblog-wj9s.onrender.com/editar/comments/${idComment}/${comment}`, {
            method: "PUT"
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == "OK") {
                    mySwal.fire({
                        title: "Felicidades!!!",
                        text: data.respuesta,
                        icon: 'success',
                        confirmButtonText: "Aceptar",
                        showCloseButton: true,
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                let text = document.getElementById('comment')
                                text.value = "";
                                setBoton(false);
                                reloadComments();
                            }
                        });
                }
                else {
                    mySwal.fire({
                        text: data.respuesta,
                        icon: 'error',
                        confirmButtonText: "Aceptar",
                        showCloseButton: true,
                    })
                }
            })

    }

    const deleteComment = (id) => {
        mySwal.fire({
            text: '¿Seguro que quieres eliminar este comentario?',
            icon: 'warning',
            confirmButtonText: "Eliminar",
            showCloseButton: true,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://apiblog-wj9s.onrender.com/eliminar/detailPublication/${id}`, {
                        method: "DELETE"
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status == "OK") {
                                fetch(`https://apiblog-wj9s.onrender.com/eliminar/comments/${id}`, {
                                    method: "DELETE"
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data.status == "OK") {
                                            mySwal.fire({
                                                title: "Felicidades!!!",
                                                text: data.respuesta,
                                                icon: 'success',
                                                confirmButtonText: "Aceptar",
                                                showCloseButton: true,
                                            })
                                                .then((result) => {
                                                    if (result.isConfirmed) {
                                                        reloadComments();
                                                    }
                                                });
                                        }
                                        else {
                                            mySwal.fire({
                                                text: data.respuesta,
                                                icon: 'error',
                                                confirmButtonText: "Aceptar",
                                                showCloseButton: true,
                                            })
                                        }
                                    })
                            }
                            else {
                                mySwal.fire({
                                    text: data.answer,
                                    icon: 'error',
                                    confirmButtonText: "Aceptar",
                                    showCloseButton: true,
                                })
                            }
                        })
                }
            });
    }
    return (
        <>
            <div className="contenedor_main">
                <div className="main">
                    {publications.map((publication, index) => (
                        <div key={index} className="contenedor-card">
                            <div className="card">
                                <img
                                    src={photoUrls[publication.id]}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{publication.title}</h5>
                                    <p className="card-text">{publication.description}</p>
                                </div>
                                <div className="show-comments">
                                    <a onClick={() => comments(publication.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                        Comments
                                    </a>
                                </div>
                                {isComment[publication.id] && (
                                    <div className="contenedor-comments">
                                        <form id="form" onSubmit={sendData} >
                                            <input id="idPublication" name="id" value={publication.id} hidden />
                                            <div className="add-comment">
                                                {boton ? (
                                                    <div className="add-comment">
                                                        <textarea name="" onChange={changeValueEdit} id="comment"></textarea>
                                                        <button type="submit" onClick={sendDataEdit}>Editar</button>
                                                    </div>
                                                ) : (
                                                    <div className="add-comment">
                                                        <textarea name="" onChange={changeValue} id="comment"></textarea>
                                                        <button type="submit">Agregar</button>
                                                    </div>
                                                )}
                                            </div>
                                        </form>
                                        <hr />
                                        <div className="comments">
                                            <ul className="ul" id={publication.id}>
                                                {detailPublication.filter(detailPublication => publication.id == detailPublication.id_Publication)
                                                    .map((detailPublication) => (
                                                        <li>
                                                            <strong>{detailPublication.comment.user.name}: </strong>
                                                            {detailPublication.comment.description}
                                                            &nbsp;
                                                            {username == detailPublication.comment.user.name ? (
                                                                <small className="botones">
                                                                    <a className="btn1" onClick={() => catchOldComment(detailPublication.comment.id, detailPublication.comment.description)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                                        </svg>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a className="btn2" onClick={() => deleteComment(detailPublication.comment.id)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                                        </svg>
                                                                    </a>
                                                                </small>
                                                            ) : (
                                                                <p>
                                                                </p>
                                                            )}
                                                        </li>
                                                    )
                                                    )}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Main;
