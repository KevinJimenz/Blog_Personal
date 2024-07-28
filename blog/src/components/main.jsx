import logo from '../assets/media/logo-removebg-preview-removebg-preview.png'
const Main = () => {
    return (
        <div className="contenedor_main">
            <div className="main">
                <div className="contenedor-card">
                    <div class="card">
                        <img src={logo} class="card-img-top" alt={logo} />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolores recusandae voluptatem sequi beatae officiis placeat minima asperiores exercitationem perferendis rerum voluptatum voluptas iusto maxime sint ad. Aspernatur, doloremque hic.
                            Amet magni exercitationem, non repellendus molestiae debitis? Fugiat dolorem sunt inventore facere dignissimos eaque eum consequatur, recusandae obcaecati amet corrupti debitis explicabo iste maiores laboriosam? Vitae obcaecati deserunt qui quo?
                            Est, porro similique excepturi consectetur voluptate ab fugit exercitationem rerum eos alias recusandae deserunt officia fuga provident! Impedit velit officiis minima et, ex cupiditate! Quae doloremque rerum omnis adipisci quod.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main