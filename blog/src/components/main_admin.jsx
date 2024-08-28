import { useState, useEffect } from "react";
import logo from "../assets/media/logo-removebg-preview-removebg-preview.png";
import swal from "sweetalert2";
import reactContent from "sweetalert2-react-content";
/**
 * * swal, es el modulo principal de Sweetalert2
 * * reactContent, me permite renderizar contenido de react dentro del Sweetalert2
 */
const mySwal = reactContent(swal);
const Main_Admin = () => {
    // Estado para almacenar los datos del Card al darle click
    const [formDataCard, setFormDataCard] = useState({
        id: "", 
        title: "", 
        description: ""
    });
    const [publications, setPublications] = useState([]); // Estado para almacenar las publicaciones
    const [photoUrls, setPhotoUrls] = useState([]); // Estado para almacenar las url de las imagenes de las publicaciones

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
        reloadContainer();
    }, [])
    const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
    // Cargar categorías una vez cuando el componente se monta
    useEffect(() => {
        fetch(`https://apiblog-wj9s.onrender.com/listar/categories`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.list);
            });
    }, []);

    const sendImage = (image) => {
        // Recorro el arreglo y obtengo solo el nombre de la imagen
        for (let index = 0; index < image.length; index++) 
        {
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
    const catchInfoCard = (id, title, description) => {
        setFormDataCard({id,title,description});
    }

    const [formDataCreate, setFormDataCreate] = useState({
        title: "",
        description: "",
        select: "",
    });

    const changeValueCreate = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setFormDataCreate({ ...formDataCreate, [key]: value });
    };

    const sendDataCreate = (e) => {
        e.preventDefault();
        createPublication(formDataCreate);
    };

    const createPublication = (data) => {
        const title = data.title;
        const description = data.description;
        const id = data.select; // id de la Categoria seleccionada
        form = document.getElementById("form");
        const formData = new FormData(form);
        const url = `https://apiblog-wj9s.onrender.com/crear/publication/${title}/${description}/${id}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                mySwal.fire({
                    title: "¡¡Felicidades!!",
                    text: data.message,
                    icon: "success",
                    confirmButtonText: "Ver publicación",
                }).then((result) => {
                    if (result.isConfirmed) {
                        reloadContainer();
                    }
                });
            });
    };

    const [formDataDelete, setFormDataDelete] = useState({
        id: "",
        title: "",
    });

    const changeValueDelete = (id, title) => {
        setFormDataDelete({
            id: id,
            title: title
        });
        console.log(formDataDelete)
    };

    const sendDataDelete = (e) => {
        e.preventDefault();
        deletePublication(formDataDelete);
    };

    const deletePublication = (data) => {
        mySwal.fire({
            title: `¡¡Cuidado!! Vas a eliminar: ${data.title}`,
            text: `¿Estas seguro que quieres eliminar esta publicación?`,
            icon: "warning",
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://apiblog-wj9s.onrender.com/eliminar/publication/${data.id}`)
                .then((response)=>response.json())
                .then((data)=>{
                    if ( data.status == "OK")
                    {
                        mySwal.fire({
                            title: "¡¡Felicidades!!",
                            text: data.answer,
                            icon: "success",
                            confirmButtonText: "Ver publicaciones",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                reloadContainer();
                            }
                        });
                    }
                    else {
                        
                        mySwal.fire({
                            title: "Revisa la información",
                            text: data.answer,
                            icon: "error",
                            confirmButtonText: "Ver publicaciones",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                reloadContainer();
                            }
                        });
                    }
                })
            }
        });
    }


    return (
        <>
            <div className="contenedor_main">
                <div className="main2">
                    <section className="left">
                        {publications.map((publication, index) => (
                            <div key={index} onClick={() =>catchInfoCard(publication.id, publication.title, publication.description)} className="contenedor-card2">
                                <div className="card">
                                    <img
                                        src={photoUrls[publication.id]}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{publication.title}</h5>
                                        <p className="card-text">{publication.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                    <div className="modal fade" id="modal_create">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">
                                        Create a Publication
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="form" id="form" onSubmit={sendDataCreate} encType="multipart/form-data">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label" >Title </label>
                                            <input type="text" className="form-control" onChange={changeValueCreate} id="title" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label" > Description
                                            </label>
                                            <textarea type="text" className="form-control description " onChange={changeValueCreate} id="description" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label" > Photo </label>
                                            <input type="file" className="form-control" name="photo" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label" > Select a Category
                                            </label>
                                            <select className="form-control" onChange={changeValueCreate} id="select">
                                                <option>
                                                    Select a Category...
                                                </option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.description}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="btn_form">
                                            <button type="submit">Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="right">
                        <button type="button" className="button_create" data-bs-toggle="modal" data-bs-target="#modal_create" > Create</button>

                        <div className="col-12 form">
                            <form>
                                <div className="img">
                                    <label className="">Image</label>
                                    <input type="file" className="" />
                                </div>
                                <div className="title">
                                    <label className="">Title</label>
                                    <input type="text" value={formDataCard.title} onChange={(e) => setFormDataCard({ ...formDataCard, title: e.target.value })} className="" />
                                </div>
                                <div className="description">
                                    <label className="">Description</label>
                                    <textarea type="text" value={formDataCard.description} onChange={(e) => setFormDataCard({ ...formDataCard, description: e.target.value })} className="" />
                                </div>
                                <div className="category">
                                    <label className="">Category</label>
                                    <select name="" id="select">
                                        <option>
                                            Select a Category...
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="button_upload">
                                    <button type="submit" className="">
                                        Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 form">
                            <form onSubmit={sendDataDelete}>
                                <div className="title">
                                    <label className="">Id</label>
                                    <input type="text" id="id" disabled value={formDataCard.id} className="" />
                                </div>
                                <div className="button_delete">
                                    <button type="submit" onClick={()=>changeValueDelete(formDataCard.id, formDataCard.title)}  className="">
                                        Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Main_Admin;
