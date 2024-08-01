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
                    <section className="left"> </section>
                    <section className="right">
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