import logo from '../assets/media/logo-removebg-preview-removebg-preview.png'

const Header = () => {
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

            </div>

            <div className="modal fade" id="modal_login" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="btn_form">
                                    <button type="submit">Sign in</button>
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
                        <form className="form">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Email</label>
                                    <input type="Email" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Password</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Photo</label>
                                    <input type="file" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="btn_form">
                                    <button type="submit">Sign Up</button>
                                </div>
                            </form>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>

    )
}


export default Header;