import { useState, useEffect } from "react";
import logo from "../assets/media/logo-removebg-preview-removebg-preview.png";
import swal from "sweetalert2";
import reactContent from "sweetalert2-react-content";
/**
 * * swal, es el modulo principal de Sweetalert2
 * * reactContent, me permite renderizar contenido de react dentro del Sweetalert2
 */
const mySwal = reactContent(swal);
const Main = ({  }) => {
    // Estado para almacenar la data del formulario create
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        select: "",
    });

    const changeValue = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setFormData({ ...formData, [key]: value });
    };

    const sendData = (e) => {
        e.preventDefault();
        createPublication(formData);
    };


    const createPublication = (data) => {
        const title = data.title;
        const description = data.description;
        const id = data.select; // id_Category
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
                    confirmButtonText: "Ver publicacion",
                });
            });
    };

    const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
    useEffect(() => {
        // Cargar categorías una vez cuando el componente se monta
        fetch(`https://apiblog-wj9s.onrender.com/listar/categories`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.list);
            });
    }, []);

    const [publications, setPublications] = useState([]); // Estado para almacenar las publicaciones
    useEffect(() => {
        // Cargar las publicaciones una vez
        fetch(`https://apiblog-wj9s.onrender.com/listar/publication`)
            .then((response) => response.json())
            .then((data) => {
                for (let index = 0; index < data.list.length; index++) {
                    const publicationPhoto = data.list[index].photo.replace(/^.*[\\/]/, "");
                    sendImage(publicationPhoto);
                }
                setPublications(data.list);
            }); 
    }, []);

    const [Photo, setPhoto] = useState([]); // Estado para almacenar las publicaciones

    const sendImage = (image)=>{
        fetch(`https://apiblog-wj9s.onrender.com/traerFoto/publication/${image}`,{
            method: 'POST',
        })
        .then((response)=> response.blob())
        .then((data)=>{
            const url = URL.createObjectURL(data)
            setPhoto(url)
        })
    }


    return (
        <>
            <div className="contenedor_main">
                    <div className="main">
                        <div className="contenedor-card">
                            <div className="card">
                                <img src={logo} className="card-img-top" alt={logo} />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Deleniti, dolores recusandae voluptatem sequi beatae
                                        officiis placeat minima asperiores exercitationem
                                        perferendis rerum voluptatum voluptas iusto maxime sint ad.
                                        Aspernatur, doloremque hic. Amet magni exercitationem, non
                                        repellendus molestiae debitis? Fugiat dolorem sunt inventore
                                        facere dignissimos eaque eum consequatur, recusandae
                                        obcaecati amet corrupti debitis explicabo iste maiores
                                        laboriosam? Vitae obcaecati deserunt qui quo? Est, porro
                                        similique excepturi consectetur voluptate ab fugit
                                        exercitationem rerum eos alias recusandae deserunt officia
                                        fuga provident! Impedit velit officiis minima et, ex
                                        cupiditate! Quae doloremque rerum omnis adipisci quod.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default Main;
