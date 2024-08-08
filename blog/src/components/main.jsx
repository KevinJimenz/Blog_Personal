import logo from '../assets/media/logo-removebg-preview-removebg-preview.png'
const Main = ({ isMain, setHeader }) => {
    // Seteo el header
    const handleHeader = (isHeader) => {
        setHeader(isHeader)
    }

    return (
        <>  <div className="contenedor_main">
            {isMain ? (
                <div className="main2">
                    <script>
                        {
                            handleHeader(true)
                        }
                    </script>
                    <section className="left">
                    </section>
                    <div className="modal fade" id="modal_create" >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Create a Publication</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="form" encType="multipart/form-data">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="email" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                            <input type="text" className="form-control " id="password" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Photo</label>
                                            <input type="file" className="form-control" name='photo' aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Select a Category</label>
                                            <select className='form-control' id="select_id">
                                                <option value=""></option>
                                            </select>
                                        </div>
                                        <div className="btn_form">
                                            <button type="submit" >Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="right">

                        <button type="button" className="button_create" data-bs-toggle="modal" data-bs-target="#modal_create">Create</button>

                        <div className="col-12 form">
                            <form>
                                <div className="img">
                                    <label className="">Image</label>
                                    <input type="file" className="" />
                                </div>
                                <div className="title">
                                    <label className="">Title</label>
                                    <input type="text" className="" />
                                </div>
                                <div className="description">
                                    <label className="">Description</label>
                                    <input type="text" className="" />
                                </div>
                                <div className="button_upload">
                                    <button type="submit" className="">Upload</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 form">
                            <form>
                                <div className="title">
                                    <label className="">Title</label>
                                    <input type="text" className="" />
                                </div>
                                <div className="button_delete">
                                    <button type="submit" className="">Delete</button>
                                </div>
                            </form>
                        </div>
                    </section>

                </div>
            ) : (
                <div className="main">
                    <div className="contenedor-card">
                        <div className="card">
                            <img src={logo} className="card-img-top" alt={logo} />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolores recusandae voluptatem sequi beatae officiis placeat minima asperiores exercitationem perferendis rerum voluptatum voluptas iusto maxime sint ad. Aspernatur, doloremque hic.
                                    Amet magni exercitationem, non repellendus molestiae debitis? Fugiat dolorem sunt inventore facere dignissimos eaque eum consequatur, recusandae obcaecati amet corrupti debitis explicabo iste maiores laboriosam? Vitae obcaecati deserunt qui quo?
                                    Est, porro similique excepturi consectetur voluptate ab fugit exercitationem rerum eos alias recusandae deserunt officia fuga provident! Impedit velit officiis minima et, ex cupiditate! Quae doloremque rerum omnis adipisci quod.</p>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
        </>
    )

}

export default Main